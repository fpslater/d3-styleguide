Chart.prototype.drawBar = function() {
  
  var self = this;
  
  var formatPercent = d3.format(".0%");

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, self.width], .1);

  var y = d3.scale.linear()
      .range([self.height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
      // .tickFormat(formatPercent);
      
      
  

  // var tip = d3.tip()
  //   .attr('class', 'd3-tip')
  //   .offset([-10, 0])
  //   .html(function(d) {
  //     return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
  //   })

  var svg = d3.select(self.selector).append("svg")
      .attr("width", self.width + self.margin.left + self.margin.right)
      .attr("height", self.height + self.margin.top + self.margin.bottom)
    .append("g")
      .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

  // svg.call(tip);

  // d3.tsv("data.tsv", type, function(error, data) {
    x.domain(self.data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(self.data, function(d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + self.height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      // .append("text")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("dy", ".71em")
      //   .style("text-anchor", "end")
      //   .text("Frequency");
      
      
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

    svg.selectAll(".bar")
        .data(self.data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return self.height - y(d.frequency); })
        .style("fill", function(d) { return self.color(d.letter); });
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide)

  // });
  
	var keyNames = (self.data.map(function(d) { return d.letter; }));
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

  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }
  
  
  
}