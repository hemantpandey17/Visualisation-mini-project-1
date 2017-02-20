function createHistogram(histData){
  console.log(histData);
  for(var i=0;i<histData.length;i++) {
        histData[i] = histData[i] || 0
    }
  var svg = d3.select("#bar")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

  var scaleHeight = (0.9*h/d3.max(histData));
  console.log("Lets color");
  

  var color =d3.scale.category20c();
  console.log("Colours and all set up");
 
  var bars = svg.selectAll("bar")
             .data(histData)
             .enter()
             .append("g")
             .append("rect")
             .attr("x", function(d, i) {
                  return i * (w / histData.length);
             })
             .attr("width", w / histData.length - barPadding)
             .attr("y", function(d,i) {
                  return h - (d * scaleHeight);
             })
             .attr("height", function(d) {
                  return d * scaleHeight;
             })
              .attr("stroke-width", 2)
              .attr("stroke", "black")
 
             .attr('fill', function(d,i){
               return color(i);
               })

             .on("mouseover", function(d,i) {
                  d3.select(this)
                  .attr("y",d3.select(this).attr("y") - 15)
                  .attr("height",parseInt(d3.select(this).attr("height")) + 15)
                  .attr("x",i * (w / histData.length) - 5)
                  .attr("width",w / histData.length - barPadding + 10)
                  .attr("stroke-width", 2)
                  .attr("stroke", "black")
                  .attr("fill", "red")
                  
                  d3.selectAll("text")
                  .select(function(d, ind) { return ind === i ? this : null; })
                  .style("opacity",50)
                  .style("fill", "white")

             })
             .on("mouseout", function(d,i) {
                  d3.select(this)
                  .attr("width", w / histData.length - barPadding)
                  .attr("y",parseInt(d3.select(this).attr("y")) + 15)
                  .attr("x",i * (w / histData.length))
                  .attr("height",parseInt(d3.select(this).attr("height")) - 15)
                  .attr("fill",color(i))
                     
                  
                  d3.selectAll("text")
                  .select(function(d, ind) { return ind === i ? this : null; })
                  .style("opacity",0)})

             .on("click",function(){
                document.getElementById("bar").innerHTML = '';
                createPieChart(histData);
                currFigure = 1;
              });

             fillTextHistogram(dataS,svg);
} 

function fillTextHistogram(histData,svg){

  var scaleHeight = (0.9*h/d3.max(histData));
  var text = svg.selectAll("text")
             .data(histData)
             .enter()
             .append("g")
             .append("text")
             .text(function(d) {
                return d;
             })
             .attr("text-anchor", "middle")
             .attr("x", function(d, i) {
                return i * (w / histData.length) + (w / histData.length - barPadding) / 2;
             })
             .attr("y", function(d) {
                  return h - (d * scaleHeight) - 20;
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", 20)
             .attr("fill", "black")
             .style("opacity",0);
}
