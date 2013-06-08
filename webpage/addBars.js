var drafts = [];
var players = [];

d3.json('drafts.json', function(data){
	drafts = data;
	drafts.forEach(function(draft){
		draft.players.forEach(function(player){
			if (player.stats){				
				if (player.stats.length == 1){
					var s = player.stats[0];
					player.stats.push({mp:s.mp, per:s.per, year:(s.year+1)});
				}
				player.stats.forEach(function(stat){
					stat.year = "" + stat.year;
				});
				player.player = true;
			}
			else {
				player.stats = [{mp: 0, per:0, year: "" + draft.year}];
				player.played = false;
			}
		});
	});

	draftDivs = d3.select("#display").selectAll("div")
					.data(drafts).enter()
				.append("div")
					.style("color", "blue")
					.text(function(d){return d.year});
				
	playerSVGS = draftDivs.append("svg")
					.attr("height", 25)
				.selectAll("rect")
					.data(function(d){return d.players;})
			.enter().append("rect")
				.attr("height", 10)
				.attr("width", 5)
				.attr("x", function(d, i){return i *10;})
				.attr("y", 0)
				.attr("fill", "purple")
				.on("mouseover", updateToolTip);
});

function updateToolTip(player){
	var data = player.stats;	

	console.log(player);

	//remove last charts
	svg.selectAll(".axis").remove()
	svg.selectAll("path").remove()

	if (data){
		d3.select("#playerName").text(data.name);

		x.domain(d3.extent(data, function(d) { return timeFormat.parse(d.year); }));
		yMIN.domain([0, 48*72]);
		yPER.domain([0, 29]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(10," + (height+10) + ")")
			.call(xAxis)

		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(-15,0)")
			.call(yMINAxis)

		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + (width+15) + ",0)")
			.call(yPERAxis)

		svg.append("path")
			.datum(data)
			.attr("class", "line MIN")
			.attr("d", linePER);
		
		svg.append("path")
			.datum(data)
			.attr("class", "line PER")
			.attr("d", lineMIN);

		console.log(player.url.split("/")[3].replace("html", "jpg"));
	}
}