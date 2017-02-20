function pieChartUtil(array){
  var sum = 0;
  for (var i=array.length-1;i>=0;i--) {
    sum+=array[i];
  }
  console.log(array);
  console.log(sum)
  return 360/sum;
}

function createPieChart(histData){
  var mulRatio = pieChartUtil(histData);
  var radius = w*0.30;
  var color =d3.scale.category20c();

  console.log(histData);
  
  var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .append('g')
            .attr("transform", "translate(" + 1.60*radius + ',' + 1.30*radius + ")"); // positoning in middle by shifting x and y

  var pie = d3.layout.pie()
            .value(function(d) {return mulRatio * d;});
  var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(0);

  var arc2 = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(radius + 20);

  var pieC = svg.selectAll("path")
            .data(pie(histData))
            .enter()
            .append("path")
            .attr('d', arc)   
            .attr("stroke-width", 1)
            .attr("stroke", "black")

            .attr('fill', function(d,i){
              return color(i);
            })


            .on("mouseover", function(d,i) {
              d3.select(this)
                .attr("stroke", "black")
                .attr("d", arc2)
                .attr("stroke-width", 4)
                .attr("fill", "red")
              
              svg.append("text")
              .attr("transform", function() {
                   return "translate(" + arc.centroid(d) + ")";
              })
              .style("text-anchor", "middle")
              //.attr("dy", ".70em")
              .attr("class", "label")
              .style("opacity",100)
              .style("fill", "white")
              .text(d.value)

            })
            .on("mouseout", function(d,i) {
              d3.select(this)
              .attr("d",arc)
              .attr("stroke", "none")
              .attr("fill",color(i))
              svg.selectAll("text")
              .style("opacity",0)
              //d.outerRadius = radius;
              
            })
            .on("click",function(){
                document.getElementById("chart").innerHTML = '';
                activateForcedirected(300,dataS);
                currFigure = 2;
            })
}