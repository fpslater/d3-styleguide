var CHART_WIDTH = 450;
var CHART_HEIGHT = 225;
var CHART_MARGINS = {top: 40, right: 130, bottom: 25, left: 50};
var CHART_COLORS = ["#8d8d3d", "#d26033", "#217693", "purple", "green"];

var DATA = [
  {date:"20110110", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)},
  {date:"20110111", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)},
  {date:"20110112", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)},
  {date:"20110113", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)},
  {date:"20110114", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)},
  {date:"20110115", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)},
  {date:"20110116", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)},
  {date:"20110117", total_builds: Math.floor((Math.random()*100)+30), total_users: Math.floor((Math.random()*100)+30)}
];

function Chart(type, selector, jsonData, title, width, height, margins, colors, yAxisName)
{
  this.type = type;
  this.selector = selector;
  this.data = jsonData;
  this.title = title;
	this.color = d3.scale.ordinal()
	    .domain(colors)
	    .range(colors);
	this.margin = margins;
	this.width = width - this.margin.left - this.margin.right;
	this.height = height - this.margin.top - this.margin.bottom;
  this.yAxisName = yAxisName;
  this.draw = function() { 
    if (type === "msl") {
      this.drawMSL();
    } else if (type == "bar") {
      this.drawBar();
    } else {
      alert("Chart type not supported."); 
    } 
  } 
}