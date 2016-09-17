class TxValueByNetwork extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      networks: []
    };   
  }

  componentDidMount() {
    let context = this;
    let tempDB = {};

    // set up the socket that we'll be listening to for events from blockchain
    let socket = new WebSocket('ws://localhost:4000');
    socket.onopen = (event) => {
      // subscribe to all transactions happening on blockchain
      socket.send(JSON.stringify({'op': 'unconfirmed_sub'}));
      console.log('WebSocket opened!');
    };


    // let makeBubbles = (eventData) => {

    let makeBubbles = (eventData) => {

      var data = processData(eventData);

      var diameter = window.innerWidth * .5;
      var color = d3.scale.category20();

      // clear the existing bubbles
      $('.bubbleChartTarget').html('');

      var svg = d3.select('.bubbleChartTarget').append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .attr('class', 'bubbleChart');

      var bubble = d3.layout.pack()
        .size([diameter, diameter])
        .value(function(d) { return d.size; })
        .sort(function(a, b) {
          return -(a.value - b.value);
        }) 
        .padding(3);
      
      // generate data with calculated layout values
      var nodes = bubble.nodes(data)
        .filter(function(d) { return !d.children; }); // filter out the outer bubble
     
      var vis = svg.selectAll('circle')
        .data(nodes);
      
      vis.enter().append('circle')
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
        .attr('r', function(d) { return d.r; })
        .attr('class', function(d) { return d.className; })
        .style('fill', function(d) { return color(d.size); })
        .on('mouseover', function(d) {
          $('.infoDisplay').text(function() {
            return d.className.toUpperCase() + ': ' + d.size.toFixed(5) + 'Ƀ'; 
          });
        });
      
      vis.append('svg:title')
        .text(function(d) { return d.size.toFixed(4) + ', ' + d.className.toUpperCase(); });

      function processData(data) {
        // data should be tempDB
        var tempArray = [];
        for (var key in data) {
          tempArray.push({
            className: key,
            size: data[key]            
          });
        }
        return { children: tempArray };
      }  
    };

    socket.onmessage = (event) => {
      var eventData = JSON.parse(event.data);
      if (!tempDB[eventData.name]) {
        tempDB[eventData.name] = 0;
      }
      
      tempDB[eventData.name] += +eventData.amount;

      makeBubbles(tempDB);
    };
  }

  render() {


    return (
      <ul>
      </ul>

    );
  }
}

window.TxValueByNetwork = TxValueByNetwork;