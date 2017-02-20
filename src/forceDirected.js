function setNewLength(){
	document.getElementById("forceD")
	document.getElementById("bar").innerHTML = '';
	document.getElementById("chart").innerHTML = '';
	document.getElementById("fdg").innerHTML = '';
	activateForcedirected(forceD.value,dataS);
}

function activateForcedirected(distance,array){
	document.getElementById("forceD")
	document.getElementById("bar").innerHTML = '';
	document.getElementById("chart").innerHTML = '';
	document.getElementById("fdg").innerHTML = '';
	console.log("Lets make FDG");
	console.log(array);
	console.log(distance);
	var nodes = []; // array of nodes

 	for(var i=0;i<array.length;i++) {
    	var node = {};
    	if(array[i]=="0") {
      	array[i] = 0;
    }
    node.name = array[i]; // column 1 ie name values being pushed into node
    nodes.push(node);
  }

  	var links = []; // edges between nodes using random function to create random edges between nodes
  	for(var i=0;i<2*array.length;i++) { 
    	var link = {};
    	link.source = parseInt(Math.random()*array.length); // source node
    	link.target = parseInt(Math.random()*array.length); // destination node
    	links.push(link); // push link 
  	}


  var dataset = {}; 
  dataset.nodes = nodes;
  dataset.links = links;

			var svg = d3.select("#fdg")
			            .append("svg")
			            .attr("width", w)
			            .attr("height", h);

			var color = d3.scale.category20c();

			 

			var force = d3.layout.force()
                     .links(dataset.links)
                     .nodes(dataset.nodes)
                     .size([w, h])
                     .linkDistance([distance])        
                     .charge([-50])            
                     .start();
			 var nodes = svg.selectAll("circle")
			         .data(dataset.nodes)
			         .enter()
			         .append("circle")
			         .attr("r", 10)
			         .attr("stroke", "black")
			         .attr("fill", function(d, i) {
			            return color(i);
			         })
			         .call(force.drag)
			         .on("click",function(){
               			 document.getElementById("fdg").innerHTML = '';
                		 createHistogram(array);
                		 currFigure = 0;
              		});

			var edges = svg.selectAll("line")
			         .data(dataset.links)
			         .enter()
			         .append("line")
			         .attr("stroke","yellow")
			         force.on("tick", function() {
						 edges.attr("x1", function(d) { return d.source.x; })
						      .attr("x2", function(d) { return d.target.x; })
						      .attr("y1", function(d) { return d.source.y; })
						      .attr("y2", function(d) { return d.target.y; });

						 nodes.attr("cx", function(d) { return d.x; })
						      .attr("cy", function(d) { return d.y; });

					 });
					 
}

