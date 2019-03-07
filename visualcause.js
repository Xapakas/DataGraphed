var dataLong = d3.csv("happiness.csv");

// console.log(dataLong); // 2 axes: happiness d[1] and gdp per capita d[5]. y is happiness, x is gdp per capita

var exeFunction = function(dataLong){

  var width = 800;
  var height = 600;

  var padding = 50;

  var xMin = d3.min(dataLong, function(d){
    return d.gdp; // gdp per capita
  });

  var xMax = d3.max(dataLong, function(d){
    return d.gdp;
  });

  var yMin = d3.min(dataLong, function(d){
    return d.happiness; // happiness
  });

  var yMax = d3.max(dataLong, function(d){
    return d.happiness;
  });

  var xScale = d3.scaleLinear()
                 .domain([xMin,xMax])
                 .range([padding,width - padding]);

  var yScale = d3.scaleLinear()
                 .domain([yMax,yMin])
                 .range([padding,height - padding]);

  var rScale = d3.scaleLinear()
                 .domain([0, 1.87])
                 .range([2,5]);

  var svg = d3.select("body")
              .append("svg")
              .attr("width",width)
              .attr("height",height);

  var xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(10);

  var yAxis = d3.axisLeft()
                .scale(yScale)
                .ticks(10);

  svg.selectAll("circle")
     .data(dataLong)
     .enter()
     .append("circle")
     .attr("cx", function(d){
       return xScale(d.gdp);
     })
     .attr("cy",function(d){
       return yScale(d.happiness);
     })
     .attr("r",10)
     .attr("fill",function(d){
       if (d.continent == "Africa"){
         return "blue";
       };
       if (d.continent == "Asia"){
         return "red";
       };
       if (d.continent == "Europe"){
         return "yellow";
       };
       if (d.continent == "NorthAmerica"){
         return "green";
       };
       if (d.continent == "SouthAmerica"){
         return "purple";
       };
     })

  svg.selectAll("text")
     .data(dataLong)
     .enter()
     .append("text")
     .text(function(d){
       return d.country;
     })
     .attr("x",function(d){
       return xScale(d.gdp);
     })
     .attr("y",function(d){
       return yScale(d.happiness) - 10;
     })
     .attr("font-family","sans-serif");

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + (height - padding) + ")")
     .call(xAxis);

  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + padding + ",0)")
     .call(yAxis);

  };

dataLong.then(function(data){
  exeFunction(data);
}) // coding this was absolute hell, i'm not even sure what day it is or if I'm still in my own body. When I close my eyes I see javascript errors.
