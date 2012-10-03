
classDrawChartTEST = function(type) {
	this.type="";
	alert('a1'+type );
}
//classDrawChartTEST.prototype = new FusionCharts();


classDrawChartTEST.prototype = {
	drawChart: function() {
				
	},
	wows: function (g) {
		this.type=g;
		
		alert('wowSUPER'+this.type);
	},
	gg: function() {
		alert(this.type);
	},
	onStateChange: function() {
		
	}
}



classDrawChart2 = function(type ) {
	this.parentClass = new classDrawChartTEST('vv');
	
	this.type=type;
	alert('a2'+type);

}


classDrawChart2.prototype = {
		drawChart: function() {
					
		},
		wow: function () {
			this.parentClass.wows('g');
			alert('wow');
			this.parentClass.gg();

			//classDrawChart2.wows();
			
		},
		send: function() {
			
		},
		onStateChange: function() {
			
		}
	}


classDrawChart3 = function(type ) {
	this.parentClass = new classDrawChartTEST('xx');
	
	this.type=type;
	alert('a2'+type);

}

classDrawChart3.prototype = {
		drawChart: function() {
					
		},
		wow: function () {
			this.parentClass.gg();

			//classDrawChart2.wows();
			
		},
		send: function() {
			
		},
		onStateChange: function() {
			
		}
	}

	
