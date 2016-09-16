
class MinersRevenue extends React.Component {

  constructor(props) {    
    super(props);

    this.state = {
      data: []
    };
  }


  componentDidMount() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'https://blockchain.info/charts/miners-revenue?format=json&cors=true',
      success: function(data) {
        // format our dates to something we can use
        // currently they're unix timestamps
        data.values.forEach( point => {
          var newDate = new Date(point.x * 1000);
          point.x = newDate;
        });
        // change our state.data to reference later
        context.setState({ data: data.values });
        // fn definitions
        var bisectDate = d3.bisector(function(d) { return d.x; }).left;
        var formatValue = d3.format(',.2f');
        var formatCurrency = function(d) { return '$' + formatValue(d); };

        // margin, width, and height for the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 80};
        var width = window.innerWidth - margin.left - margin.right;
        var height = window.innerHeight - 150 - margin.top - margin.bottom;

        // scaling for the graph
        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        // axes for the graph
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        // fn to draw the line on our graph
        var line = d3.svg.line()
            .x(function(d) {
              return x(d.x);
            })
            .y(function(d) {
              return y(d.y);
            });

        // append the graph svg on the dom
        var svg = d3.select('body').append('svg')
            .attr('class', 'wtf')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        x.domain(d3.extent(context.state.data, function(d) {
          return d.x;
        }));
        y.domain(d3.extent(context.state.data, function(d) {
          return d.y;
        }));

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

        // this is going to draw our line
        svg.append('path')
          .attr('d', line(context.state.data))
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('fill', 'none');

        // code to get the mouseover effect on the graph


        var focus = svg.append('g')
              .attr('class', 'focus')
              .style('display', 'none');

        // fn to change values based on where the mouse is
        var mousemove = function() {
          var x0 = x.invert(d3.mouse(this)[0]);
          var i = bisectDate(context.state.data, x0, 1);
          var d0 = context.state.data[i - 1];
          var d1 = context.state.data[i];
          var d = x0 - d0.x > d1.x - x0 ? d1 : d0;
          focus.attr('transform', 'translate(' + x(d.x) + ',' + y(d.y) + ')');
          // this will change the text that's displaying x and y values on the graph
          d3.select('.infoDisplay').select('text').text(formatCurrency(d.y) + ' on ' + moment(d.x).format('MMM Do YYYY'));
        };

        // this is the circle that is showing us what point on the graph
        // we are selecting
        focus.append('circle')
            .attr('r', 4.5);

        // this is going to append the text that displays x and y values
        d3.select('.infoDisplay').append('text')
            .attr('class', 'textOverlay')
            .attr('x', 9)
            .attr('dy', '-.35em');

        // this is a transparent overlay that is going to 'hear' our mouse movements
        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', function() { focus.style('display', null); })
            .on('mouseout', function() { focus.style('display', 'none'); })
            .on('mousemove', mousemove);

        
        
      }
    });
    
  }

  render() {
    return (
          <div></div>
    );
  }
     
}  

window.MinersRevenue = MinersRevenue;