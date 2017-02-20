function activateBinWidth(){
	 
	d3.select("#binCountUpdate").on("mousedown", function() {
  	
  	var div = d3.select(this)
	      	  .classed("active", true);

	var xPos = d3.mouse(div.node())[0]
	var w = d3.select(window)
		      .on("mousemove", mousemove)
		      .on("mouseup", function(){
		      	div.classed("active", false);
	    		w.on("mousemove", null).on("mouseup", null);
		      });

	  function mousemove() {
	  	if(d3.mouse(div.node())[0] + 5 < xPos && binCount > 1){
	  		binCount -= 1;
	  		cycleVariables();
	  		currColumn -= 1;
	  		xPos = d3.mouse(div.node())[0];
	  	}
	    else if(d3.mouse(div.node())[0] - 5 > xPos && binCount < 30){
	  		binCount += 2;
	  		cycleVariables();
	  		currColumn -= 1;
	  		xPos = d3.mouse(div.node())[0];
	  	}
	  }
});	
}
