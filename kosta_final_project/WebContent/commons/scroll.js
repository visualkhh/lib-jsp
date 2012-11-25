ajax.scroll = {};

ajax.scroll.source = function(targetId, elementId){
	this.target = document.getElementById(targetId);
	this.element = document.getElementById(elementId);
	
	this.mouseDown = ajax.Event.bindAsListener(this.doMouseDown, this);
	
	ajax.Event.addListener(this.element, "mousedown", this.mouseDown);
}

ajax.scroll.source.prototype = {
	doMouseDown: function(e){
	
		var elementXY = ajax.GUI.getXY(this.element);
		var newXY = {x: elementXY.x-10px, y: elementXY.y-10px};
		
		ajax.GUI.setXY(this.element, newXY.x, newXY.y);
		
	}
}



