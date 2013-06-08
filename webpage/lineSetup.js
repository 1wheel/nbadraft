var margin = {top: 20, right: 80, bottom: 30, left: 50},
	width = 300 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

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
	.orient("left");

var yPERAxis = d3.svg.axis()
	.scale(yPER)
	.orient("right");

var lineMIN = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(timeFormat.parse(d.year)); })
	.y(function(d) { return yMIN(+d.mp); });

var linePER = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(timeFormat.parse(d.year)); })
	.y(function(d) { return yPER(+d.per); });

var svg = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
