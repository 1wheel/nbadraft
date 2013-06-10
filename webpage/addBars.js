var drafts = [];
var players = [];

var colorScale = d3.scale.linear()
					.range(['red', '#fff70f', '#cccccc', '#cccccc', '#e8e8e8', '#e8e8e8']);

d3.json('drafts.json', function(data){
	drafts = data;
	drafts.forEach(function(draft){
		draft.players.forEach(function(player){
			player.impact = 0
			if (player.stats){				
				if (player.stats.length == 1){
					var s = player.stats[0];
					player.stats.push({mp:s.mp, per:s.per, year:(s.year+1)});
				}
				player.stats.forEach(function(stat){
					stat.year = "" + stat.year;
					player.impact = stat.mp*stat.per + player.impact;
				});
				player.played = true;
			}
			else {
				player.stats = [{mp: 0, per:0, year: "" + draft.year}];
				player.played = false;
			}
			player.year = draft.year;
			player.rank = 12;
		});
		
		draft.players.sort(function(a, b){return b.impact - a.impact;});

		draft.players.forEach(function(player, i){ player.rank = player.played ? i + 1 : 81; });
		draft.players.sort(function(a, b){return a.num - b.num;})

	});

	draftDivs = d3.select("#display").selectAll("div")
					.data(drafts).enter()
				.append("div")
					.style("color", "blue")
					.text(function(d){return d.year});
				
	playerSVGS = draftDivs.append("svg")
					.attr("height", 12)
				.selectAll("rect")
					.data(function(d){return d.players;})
			.enter().append("rect")
				.attr("height", 10)
				.attr("width", 5)
				.attr("x", function(d, i){return i *7;})
				.attr("y", 1)
				.attr("fill", function(d){ return d.played ? "grey" : "lightgrey"; })
				.on("mouseover", function(d){
					updateTooltip(d);

					d3.select(this)
						.attr("stroke", "black")
						.attr("stroke-width", 2);

					tooltip
					    .style("left", (d3.event.pageX + 5) + "px")
					    .style("top", (d3.event.pageY - 5) + "px")
					    .transition().duration(300)
					    .style("opacity", 1)
					    .style("display", "block")
				})
				.on("mouseout", function(d){
					d3.select(this)
						.attr("stroke", "");

					tooltip.transition().duration(700).style("opacity", 10);
				});

	updateColorScale(10);
});

function updateColorScale(maxRank){
	colorScale.domain([1, maxRank, maxRank + 1, 80, 81, 21])
	playerSVGS.attr("fill", function(d){ return colorScale(d.rank); });
}

function updateTooltip(player){
	var data = player.stats;	

	console.log(player);

	//remove last charts
	svg.selectAll(".axis").remove()
	svg.selectAll("path").remove()

	d3.select("#pName").html(player.name.replace(" ", "</br>"));
	d3.select("#pNum").text(suffix(player.num));
	d3.select("#pTeam").text(player.team);
	d3.select("#pRank").text(suffix(player.rank));
	d3.select("#pYear").text(player.year);

	var imgURL = player.url ? player.url.split("/")[3].replace("html", "jpg") : player.name.replace(" ", "_") + ".jpg";
	document.getElementById("tooltipImg").src = "thumbnails/" + imgURL;

	if (data){

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

		//console.log(player.url.split("/")[3].replace("html", "jpg"));
	}
}

function suffix(n) {
	mod = n % 10;
	return n + (mod > 3 ? 'th' : ['th', 'st', 'nd', 'rd'][mod]);
};