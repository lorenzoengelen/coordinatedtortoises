var socketURI = 'ws://localhost:4000';

var initSocket = function(cb) {
  var bitsocket = new WebSocket(socketURI);
  bitsocket.onopen = function() {
    console.log('Connection opened!');
  };
  bitsocket.onerror = function(e) {
    console.log('There was an error: ', e);
  };
  bitsocket.onmessage = function(event) {
    cb(event.data);
  }
}

var draw = function() {

  var width  = 820;
  var height = 620;
  var rScale = d3.scale.sqrt();
  var rotate = [10, -10];
  var velocity = [.003, -.001];
  var time = Date.now();

  // projection type and paremetes
  var projection = d3.geo.orthographic()
    .scale(300)
    .translate([(width / 2) + 50, height / 2])
    .clipAngle(90)
    .precision(0.3); // 0.3

  // path variable
  var path = d3.geo.path()
    .projection(projection);
  // graticule
  var graticule = d3.geo.graticule();
  // empty svg element
  var svg = d3.select("svg");
  // group container
  var g = svg.append("g");

  // grey sphere as landmass
  g.append("path")
    .datum({type: "Sphere"})
    .attr("class", "sphere")
    .attr("d", path)
    .attr("fill", "#eee")
    .attr("d", path);

  g.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere")
      .attr("d", path);

  g.append("use")
      .attr("class", "fill")
      .attr("xlink:href", "#sphere")
      .attr("d", path);

  g.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

  d3.json("../assets/world-50m.json", function(error, world) {
    if (error) throw error;

    g.append("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    g.append("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);
  });

  initSocket(function(transaction) {
    console.log(JSON.parse(transaction));
    
    var transaction = JSON.parse(transaction);
    var lonlat = [transaction.lon, transaction.lat];
    var xy = projection(lonlat);

    var calculate = function(amount) {
      return 10 * (1 - Math.pow(Math.E, (-0.5 * amount)));
    };

    g.append("circle")
    .attr({
      cx: xy[0],
      cy: xy[1],
      r: calculate(transaction.amount)
    })
    .attr("d", path)
    .attr("fill", "#ffba00")
    .attr("fill-opacity", 0.8)
    .transition()
    .duration(2000)
    .style("fill-opacity", 0)
    .remove();

    var feature = svg.selectAll("path");

    // ROTATION
    var sens = 0.25;
    feature.call(d3.behavior.drag()
      .origin(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
      .on("drag", function() {
        var λ = d3.event.x * sens,
        φ = -d3.event.y * sens,
        rotate = projection.rotate();
        //Restriction for rotating upside-down
        φ = φ > 30 ? 30 :
        φ < -30 ? -30 :
        φ;
        projection.rotate([λ, φ]);
        feature.attr("d", path);
      }))
  });

  // hackish approach to get bl.ocks.org to display individual height
  d3.select(self.frameElement).style("height", height + "px");
};


var addLocation = function(loc) {
};

window.worldMap = {
  draw: draw,
  add: addLocation
};
