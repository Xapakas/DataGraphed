var dataLong = d3.csv("2017.csv");

console.log(dataLong); // 2 axes: happiness d[1] and gdp per capita d[5]. y is happiness, x is gdp per capita

console.log(d3.max(dataLong));

var xMin = d3.min(dataLong, function(d){
  console.log(d.Economy)
  return d.Economy; // gdp per capita
});

var xMax = d3.max(dataLong, function(d){
  return d.Economy;
});

var yMin = d3.min(dataLong, function(d){
  return d.Happiness; // happiness
});

var yMax = d3.max(dataLong, function(d){
  return d.Happiness;
});

var rMax = d3.max(dataLong, function(d){
  return d.Generosity; // generosity
});

var width = 600;
var height = 600;

// console.log(xMin, xMax, yMin, yMax);

var xScale = d3.scaleLinear()
               .domain([xMin,xMax])
               .range([0,width])
               .nice();

var yScale = d3.scaleLinear()
               .domain([yMin,yMax])
               .range([0,height])
               .nice();

var rScale = d3.scaleLinear()
               .domain([0, yMax])
               .range([2,5])
               .nice();

var svg = d3.select("body")
            .append("svg")
            .attr("width",width)
            .attr("height",height);

svg.selectAll("circle")
   .data(dataLong)
   .enter()
   .append("circle")
   .attr("cx", function(d){
     return xScale(d.Economy);
   })
   .attr("cy",function(d){
     return yScale(d.Happiness);
   })
   .attr("r",5)
   // .attr("r",function(d){
   //   return rScale(d[9]);
   // })
   .attr("fill","red");
