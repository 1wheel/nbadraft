var margin = {top: 20, right: 80, bottom: 30, left: 50},
	width = 300 - margin.left - margin.right,
	height = 200 - margin.top - margin.bottom;


var x = d3.time.scale()
	.range([0, width]);

var yMIN = d3.scale.linear()
	.range([height, 0]);

var yPER = d3.scale.linear()
	.range([height, 0]);

var color = d3.scale.category10();

var timeFormat = d3.time.format("%Y")

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(4);

var yMINAxis = d3.svg.axis()
	.scale(yMIN)
	.orient("left")
	.tickValues([1000, 2000, 3000]);

var yPERAxis = d3.svg.axis()
	.scale(yPER)
	.orient("right")
	.tickValues([10, 20, 30]);

var svg = d3.select("#tooltipBot").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("#tooltip")
  	  .attr("class", "tooltip")
  	  .style("opacity", 1e-6)
  	  .style("background", "rgba(250,250,250,.80)");
