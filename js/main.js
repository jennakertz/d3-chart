// events js

$(document).ready(function(){

    var x = function(data){
	
	var min = d3.min(data, function(d){
	    return d.age;
	});

	var max = d3.max(data, function(d){
	    return d.age;
	});

	return max;
    }; 


    var y = function(data){
	var counts = {};

	for(i=0;i < data.length; i++){
	    num = data[i].age;
	    counts[num] = counts[num] ? counts[num]+1 : 1;
	};

	return d3.max(d3.values(counts));
    };

    var z = function(data){
	
	var min = d3.min(data, function(d){
	    return d.hrs_before;
	});

	var max = d3.max(data, function(d){
	    return d.hrs_before;
	});

	return max;
    };

    var getClients = function(data){
	Array.prototype.contains = function(v) {
	    for(var i = 0; i < this.length; i++) {
		if(this[i] === v) return true;
	    }
	    return false;
	};


	Array.prototype.unique = function() {
	    var arr = [];
	    for(var i = 0; i < this.length; i++) {
		if(!arr.contains(this[i])) {
		    arr.push(this[i]);
		}
	    }
	    return arr; 
	};

	var uniqueClients = function(data){
	    var clients = [];
	    for(i=0; i<data.length; i++){
		clients.push(data[i].person_number.toString());
	    }

	    var uniqueClients = clients.unique();

	    return uniqueClients;	    
	}

	return uniqueClients(data);
	
    }

    var createColors = function(data){
	Array.prototype.contains = function(v) {
	    for(var i = 0; i < this.length; i++) {
		if(this[i] === v) return true;
	    }
	    return false;
	};


	Array.prototype.unique = function() {
	    var arr = [];
	    for(var i = 0; i < this.length; i++) {
		if(!arr.contains(this[i])) {
		    arr.push(this[i]);
		}
	    }
	    return arr; 
	};

	var uniqueCategory = function(data){
	    var categories = [];
	    for(i=0; i<data.length; i++){
		categories.push(data[i].category);
	    }

	    var uniqueCategories = categories.unique();

	    var colorMatch = [];

	    function storeColorCategories(category, color){
		colorMatch.push({category:category, color:color});
	    }	

	    for(i=0;i<uniqueCategories.length; i++){
		var colors = ['#EAC435', '#A60067', '#8A84E2', '#03CEA4', '#345995', '#3E8914', '#F44708', '#EA3546', '#0C0A3E', '#246EB9', '#FF88DC']
		var category = uniqueCategories[i];
		var color = colors[i];
		colorMatch.push({category, color});
	    }

	    return colorMatch;	    
	}

	return uniqueCategory(data);

    }

    var trialPeriod = function(){
	var axes = $('text');
	// var markers = Number($('text').innerHTML);

	for(i=0;i<axes.length;i++){
	    if(axes[i].hasAttribute('y') && Number(axes[i].innerHTML) <= 14){
		$('text')[i].setAttribute("style", "fill:red;stroke-widtbh:12;");
	    }
	}
    }

    var highlight = function(){
	
    	d3.selectAll('circle')
    	    .on('mouseover', function(data) {

		var current = d3.select(this).attr('data-id');
    		// console.log('current is ' + current);
    		// console.log(typeof(current));

		d3.json('https://raw.githubusercontent.com/jennakertz/d3-chart/master/js/data.json', function(data){
		    console.log(data);
		    console.log('current is ' + current);

		    var getDetails = $.grep(data, function(e){
    			return e.id == current;
    		    });

		    console.log(getDetails);

		    $('#js-not-details')[0].innerHTML = '<pre><code>' + JSON.stringify(getDetails[0], undefined, 2) + '</code></pre>'; 

		})

	    });
		

	d3.selectAll('circle')
	    .on('mouseout', function(){
		$('#js-not-details')[0].innerHTML = '<p>Hover over a event to see detailed information.</p>';		
	    })
    }


    var createNodes = function(data, xScale, yScale, width, height, space, x, y, colors){
	
 	var y = 0;
	
	for(i=0; i<data.length; i++){

	    var cx = xScale(data[i].age);
	    var cy = yScale(1);
	    var recordId = data[i].id;

	    function findColor(colors){
		return colors.category == data[i].category;
	    }

	    // console.log(data[i].category);
	    var color = colors.find(findColor).color;
	    
	    coords = [];

	    function storeCoordinate(xVal, yVal) {
		coords.push({oldx: xVal, oldy: yVal});
	    }

	    var nodesArray = [].slice.call(document.querySelectorAll('circle[cx="' + cx + '"]'));

	    if(nodesArray.length > 0){

		var newY = (yScale(1 * nodesArray.length));

		if(data[i].email){
		    var circle = d3.select("svg").append("circle")
	    		.attr("transform","translate(" + space + ', ' + space + ')')
    	    		.attr("cx", cx)
    	    		.attr("cy", newY)
    	    		.attr("r", 2)
	    		.attr("data-id", recordId)
			.attr('fill', color);
		}else{
		    var circle = d3.select("svg").append("circle")
	    		.attr("transform","translate(" + space + ', ' + space + ')')
    	    		.attr("cx", cx)
    	    		.attr("cy", newY)
    	    		.attr("r", 2)
	    		.attr("data-id", recordId)
			.attr('fill', color)
			.attr('fill-opacity', 0.2);
		}
	    }else{

		// console.log('false');
		
		if(data[i].email){
		    var circle = d3.select("svg").append("circle")
	    		.attr("transform","translate(" + space + ',' + space + ')')
    	    		.attr("cx", cx)
    	    		.attr("cy", cy)
    	    		.attr("r", 2)
	    		.attr("data-id", recordId)
			.attr('fill', color);
		}else{
		    var circle = d3.select("svg").append("circle")
	    		.attr("transform","translate(" + space + ',' + space + ')')
    	    		.attr("cx", cx)
    	    		.attr("cy", cy)
    	    		.attr("r", 2)
	    		.attr("data-id", recordId)
			.attr('fill', color)
			.attr('fill-opacity', 0.2);
		}
	    }

	}

	// console.log(data);
	highlight();
	
    };

    var drawAxes = function(data, colors){

	d3.select("svg").remove();

	document.getElementById('activePerson').innerHTML = data[0].person_number;
	document.getElementById('activeNots').innerHTML = data.length;
	

	var svgWidth = 750;
	var svgHeight = 675;
	var space = 25;

	var width = svgWidth - (2 * space);
	var height = svgHeight - (2 * space);

	var xScale = d3.scaleLinear()
	// domain is for data
	    .domain([-1,x(data)])
	// range is for pixels
	    .range([0, width])
	
	var yScale = d3.scaleLinear()
	// domain is for data
	    .domain([y(data),0])
	// range is for pixels
	    .range([0,height])
	
	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);
	
	d3.select("#chart").append("svg")
    	    .attr("width", svgWidth)
    	    .attr("height", svgHeight)
    	    .append("g")
 	    .attr("transform","translate(25,25)")
	    .call(yAxis)
	    .append("g")
    	    .attr("transform", "translate(0, " + height + ")")
	    .call(xAxis);

	var scaleSecs = d3.scaleLinear()
	    .domain([0,z(data)])
	    .range([0,1]);

	function storeTimeScales(xVal, yVal, zVal, aVal, bVal, cVal) {
	    timeScales.push({id:id, fireAt: fireAt, hrs_before:hrs_before, age:age, category:category, email:email});
	}

	timeScales = [];

	for(i=0; i<data.length; i++){
	    var id = data[i].id;
	    var hrs_before = data[i].hrs_before;
	    var age = data[i].age;
	    var fireAt = (Math.ceil(scaleSecs(data[i].hrs_before)*200)/200).toFixed(3);
	    var category = data[i].category
	    var email = data[i].started_at
	    storeTimeScales(+id, +fireAt, +hrs_before, +age, category, email);	
	}

	var t = -0.001;

	TimeInterval();

	function TimeInterval(){ 
	    var interval = setInterval(function(){

		t+=0.001;
		
		if(t >=1.01){
		    clearInterval(interval);
		}else{

		    var fireNow = [];
		    
		    function storeFireNow(xVal, yVal, zVal, aVal, bVal, cVal){
			fireNow.push({id:id, fireAt: fireAt, hrs_before: hrs_before, age:age, category:category, email:email});
		    }

		    for(i=0; i<timeScales.length; i++){

			if(timeScales[i].fireAt == t.toFixed(3)){
			    var id = timeScales[i].id;
			    var fireAt = timeScales[i].fireAt;
			    var hrs_before = timeScales[i].hrs_before;
			    var age = timeScales[i].age;
			    var category = timeScales[i].category;
			    var email = timeScales[i].email;
			    storeFireNow(+id, +fireAt, +hrs_before, +age, category, email);	
			}

		    }

		    fireNow.forEach(function(d){ d.age = +d.age; });

	    	    if(fireNow.length > 0){
			createNodes(fireNow, xScale, yScale, width, height, space, x, y, colors);
		    }else{
			// console.log('No data for createNodes().')
		    };

		}

	    }, 1);
	}
    }

    var data = d3.json('https://raw.githubusercontent.com/jennakertz/d3-chart/master/js/data.json', function(data){

	data.forEach(function(d){ d.person_number = +d.person_number; });  
    	
	// convert age to a number
	data.forEach(function(d){ d.age = +d.age; });  

	// convert hrs_before to a number
	data.forEach(function(d){ d.hrs_before = +d.hrs_before; });

	var colors = createColors(data);
	
	console.log(colors);

	function colorLegend(colors){
	    for(i=0;i<colors.length;i++){
		document.getElementById('js-color-legend').innerHTML += '</br>' + '<div id="js-color-legend-' + colors[i].category + '" style="background-color:' + colors[i].color + ';color:white;"><p>' + '   ' + colors[i].category + '</p></div>'; 
	    }
	}

	colorLegend(colors);

	var clients = getClients(data);

	console.log(clients);

	var autoFill = function(clients) {
	    $( "#person" ).autocomplete({
		source: clients
	    });
	};

	autoFill(clients);

	// biggest client to start
	var newData = $.grep(data, function(e){
    	    return e.person_number == '561';
	})

	// console.log(newData);
	drawAxes(newData, colors);

	trialPeriod();

	// use text box to search
	var select = function(data){
	    $('#search').submit(function(event){
		event.preventDefault();

		var person = document.getElementById('person').value;

		console.log(person);
		console.log(data);
		
		var newData = $.grep(data, function(e){
    		    return e.person_number == person.toString();
		})

		drawAxes(newData, colors);
		trialPeriod();
	    });
	};	

	// use random search button to search
	var getLucky = function(clients){
	    document.getElementById('randomPerson').addEventListener('click',
								  function(){
								      // console.log(clients);
								      var rand = clients[Math.floor(Math.random() * clients.length)];
								      var person = rand;
								      var newData = $.grep(data, function(e){
    									  return e.person_number == person.toString();
								      })

								      drawAxes(newData, colors);
								      trialPeriod();
								  }
								 )
	}

	getLucky(clients);
	select(data);
	
	// console.log(data);
	console.log('Max. events per day = ' + y(data));
	console.log('Max. days of lifetime = ' + x(data));
	console.log('Max. hrs btw signup and saved = ' + z(data));


    })

});
