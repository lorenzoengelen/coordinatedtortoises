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
  // var peoplePerPixel = 50000;
  // var max_population = [];

  // config for spinning effect
  var time = Date.now();
  var rotate = [0, 0];
  var velocity = [.015, -0];

  // projection type and paremetes
  var projection = d3.geo.orthographic()
    .scale(300)
    .translate([(width / 2) + 50, height / 2])
    .clipAngle(90)
    .precision(0.3);

  // path variable
  var path = d3.geo.path()
    .projection(projection);
  // empty svg element
  var svg = d3.select("svg");
  // group container
  var g = svg.append("g");

  // grey sphere as landmass
  g.append("path")
    .datum({type: "Sphere"})
    .attr("class", "sphere")
    .attr("d", path)
    .attr("fill", "#777"); // #eee

  initSocket(function(transaction) {
    console.log(JSON.parse(transaction));
    
    var transaction = JSON.parse(transaction);
    var lonlat = [transaction.lon, transaction.lat];
    var xy = projection(lonlat);

    g.append("circle")
    .attr({
      cx: xy[0],
      cy: xy[1],
      r: transaction.amount
    })
    .attr("fill", "#ffba00")
    .attr("fill-opacity", 0.2);
  });

  // hackish approach to get bl.ocks.org to display individual height
  d3.select(self.frameElement).style("height", height + "px");
};

// loc = [longitude, latitude]
var addLocation = function(loc) {

    var coords = projection(loc);

    d3.select(".worldMap").append('svg:circle')
      .attr('cx', coords[0])
      .attr('cy', coords[1])
      .attr('r', 1.5)
      .attr('fill', 'red');

};

window.worldMap = {
  draw: draw,
  add: addLocation
};

// // Taken from Mike Bostock's example
// // https://bl.ocks.org/mbostock/d4021aa4dccfd65edffd
// var width = 960,
//     height = 547;

// var projection = d3.geo.patterson()
//     .scale(153)
//     .translate([width / 2, height / 2])
//     .precision(0.1);

// var draw = function() {

//   var path = d3.geo.path()
//       .projection(projection);

//   var graticule = d3.geo.graticule();

//   var map = d3.select(".main-map").append("svg")
//       .attr("viewBox", "0 0 " + width + " " + height)
//       .attr("preserveAspectRatio", "xMinYMin meet")
//       .attr("class", "worldMap");

//     map.append("path")
//         .datum(graticule)
//         .attr("class", "graticule")
//         .attr("d", path);

//   d3.json("../assets/world-50m.json", function(error, world) {
//     if (error) throw error;

//     map.insert("path", ".graticule")
//         .datum(topojson.feature(world, world.objects.land))
//         .attr("class", "land")
//         .attr("d", path);

//     map.insert("path", ".graticule")
//         .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
//         .attr("class", "boundary")
//         .attr("d", path);

//   });

//   d3.select(self.frameElement).style("height", height + "px");

// };

// // loc = [longitude, latitude]
// var addLocation = function(loc) {

//     var coords = projection(loc);

//     d3.select(".worldMap").append('svg:circle')
//         .attr('cx', coords[0])
//         .attr('cy', coords[1])
//         .attr('r', 1.5)
//         .attr('fill', 'red');

// };

// window.worldMap = {
//   draw: draw,
//   add: addLocation
// };
