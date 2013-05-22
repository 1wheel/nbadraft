var years = [];
var players = [];

for (var year = 1989; year < 2013; year++){
	players = [];
	for (var player = 1; player < 60; player++){
		players.push({'id': player});
	}
	years.push({'year': year, 'players': players});
}

yearDivs = d3.select("#display").selectAll("div")
				.data(years).enter()
			.append("div")
				.style("color", "blue")
				.text(function(d){return d.year})
			
playerSVGS = yearDivs.append("svg")
				.attr("height", 25)
			.selectAll("rect")
				.data(function(d){return d.players;})
		.enter().append("rect")
			.attr("height", 10)
			.attr("width", 5)
			.attr("x", function(d, i){return i *10;})
			.attr("y", 0)
			.attr("fill", "purple");

			// append("svg")
			// 	.attr("height", 25)
			// 	.selectAll("rect").data(function(d){
			// 		console.log(d.players);
			// 		return d.players;})
			// 	.append("rect")
			// 		.attr("fill", "red")

