var d3 = require("d3")

var getData = function(){
  var data = [];
  for(var i=0; i<100; i++){
    data.push({
      x: i,
      y: Math.round(Math.random() * 100)
    });
  };
  return data;
};

function line(){
  var $el = d3.select('body')
  var width = 960
  var height = 500
  var color = 'steelblue'
  var margin = {top: 10, right: 30, bottom: 30, left: 30}
  var data = []
  var svg, y, xAxis, yAxis, line
  var x = d3.scaleLinear().range([0, width])
  
  var object = {};
  
  object.render = function(){
    if(!svg){
      y = d3.scaleLinear()
        .range([height, 0])
      
      xAxis = d3.axisBottom(x)
      
      yAxis = d3.axisLeft(y)
      
      line = d3.line()
        .x(function(d) { return x(d.x)})
        .y(function(d) { return y(d.y)})
        
      svg = $el.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + "," + margin.top + ')');
      
      x.domain(d3.extent(data, function(d) { return d.x; }))
      y.domain(d3.extent(data, function(d) { return d.y; }))
      
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        
      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        
      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('stroke', color)
        .attr('d', line)
    } 
    return object;
  }
  object.data = function(value){
    if (!arguments.length) return data;
    data = value;
    return object;
  };

  object.$el = function(value){
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value){
    if (!arguments.length) return width;
    width = value;
    return object;
  };

  object.height = function(value){
    if (!arguments.length) return height;
    height = value;
    return object;
  };

  object.color = function(value){
    if (!arguments.length) return color;
    color = value;
    return object;
  };
  object.x = function(value){
    if (!arguments.length) return x;
    x = value;
    return object;
  }
  return object;
}

var line1 = line()
              .$el(d3.select("#line-1"))
              .height(200) // Set height
              .data(getData()) // Set data
              .render();