// Draw MultiSeriesLine Chart
Chart.prototype.drawMSL = function() {
  var self = this;
   
	var parseDate = d3.time.format("%Y%m%d").parse;

	var x = d3.time.scale()
	    .range([0, self.width]);

	var y = d3.scale.linear()
	    .range([self.height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
			.tickFormat(d3.time.format("%m/%d"))
			.ticks(7);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");
			
	function make_y_axis() {        
	    return d3.svg.axis()
	        .scale(y)
	        .orient("left")
	        .ticks(7)
	}

	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.temperature); });
						
	var div = d3.select(self.selector).append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var svg = d3.select(self.selector).append("svg")
			.style('fill',"darkgrey")
	    .attr("width", self.width + self.margin.left + self.margin.right)
	    .attr("height", self.height + self.margin.top + self.margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

  self.color.domain(d3.keys(self.data[0]).filter(function(key) { return key !== "date"; }));
  
  this.data.forEach(function(d) {
    var date = d.date;
    if (new Date(d.date) != "Invalid Date") { // make sure date is in correct format
      date = $.datepicker.formatDate('yymmdd', new Date(d.date));
    }

    d.date = parseDate(date);
  });
	
  var cities = self.color.domain().map(function(name) {
    return {
      name: name,
      values: self.data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  x.domain(d3.extent(self.data, function(d) { return d.date; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + self.height + ")")
      .call(xAxis)
			.selectAll("text")
				.attr("transform", "rotate(0)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
			
  svg.append("g")         
      .attr("class", "grid")
      .call(make_y_axis()
          .tickSize(-self.width, 0, 0)
          .tickFormat("")
      );
			
  var city = svg.selectAll(".city")
      .data(cities)
      .enter().append("g")
      .attr("class", "city");
	
  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return self.color(d.name); });
		
	city.append("g").selectAll("circle")
	  .data(function(d){return d.values})
	  .enter()
	  .append("circle")
	  .attr("r", 2)
	  .attr("cx", function(dd){return x(dd.date)})
	  .attr("cy", function(dd){return y(dd.temperature)})
		.attr("fill", function(d){return self.color(this.parentNode.__data__.name)})
	  .attr("stroke", function(d){return self.color(this.parentNode.__data__.name)})
		.style("stroke-width", "1.5px")
		.on("mouseover", function(d) {
      // div.transition()
      //   .duration(200)
      //   .style("opacity", .7);
      // div.html(d.temperature)
      //   .style("margin-left", d3.select(this).attr("cx") + 110 + "px")     
      //   .style("margin-top", d3.select(this).attr("cy") - 20 + "px")
      //   .style("background-color", "#83d8e2")
      //   .style("color", "white");
		})
		.on("mouseout", function(d) {
      // div.transition()
      //   .duration(400)
      //   .style("opacity", 0);
		});
		
	svg.append("text")
	        .attr("x", (self.width / 2)+20)             
	        .attr("y", 0 - (self.margin.top / 2))
	        .attr("text-anchor", "middle")  
					.attr("class", "chart-title") 
	        .text(self.title);
					
	svg.append("text")
	        .attr("x", -(self.height/2))             
	        .attr("y", -30 )
	        .attr("text-anchor", "middle")  
					.attr("transform", "rotate(-90)")
	        .style("font-size", "11px") 
	        .text(self.yAxisName);
	
	var keyNames = d3.keys(self.data[0]).filter(function(key) { return key !== "date"; });
  var legendY = (self.height/2) - (keyNames.length * 18);
	var legend = svg.selectAll(".legend")
      .data(keyNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
			
  legend.append("rect")
      .attr("x", self.width + 28)
			.attr("y", legendY + 13)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", self.color);

  legend.append("text")
      .attr("x", self.width + 40)
      .attr("y", legendY + 18)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });
}
