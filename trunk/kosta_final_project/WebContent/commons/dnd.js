ajax.dnd = {};

ajax.dnd.SimpleDragSource = function(elementId){
	this.element = document.getElementById(elementId);
	this.dragging = false;
	this.selected = false;
	this.diff = null;
	
	this.mouseDown = ajax.Event.bindAsListener(this.doMouseDown, this);
	this.mouseMove = ajax.Event.bindAsListener(this.doMouseMove, this);
	this.mouseUp = ajax.Event.bindAsListener(this.doMouseUp, this);
	
	ajax.Event.addListener(this.element, "mousedown", this.mouseDown);
}

ajax.dnd.SimpleDragSource.prototype = {
	doMouseDown: function(e){
		var event = window.event || e;
		
		if(!ajax.Event.isLeftButton(event)) return;
		
		this.selected = true;
		
		var elementXY = ajax.GUI.getXY(this.element);
		var mouseXY = ajax.Event.getMouseXY(event);
		this.diff = {x:mouseXY.x-elementXY.x , y:mouseXY.y-elementXY.y};
		
		ajax.Event.addListener(this.element, "mousemove", this.mouseMove);
		ajax.Event.addListener(this.element, "mouseup", this.mouseUp);
		
		ajax.Event.stopEvent(event);
	},
	
	doMouseMove: function(e){
		if(!this.selected) return false;
		
		if(!this.dragging){
			this.dragging = true;
			ajax.GUI.setOpacity(this.element, 0.60);
		}
		
		var event = window.event || e;
		var mouseXY = ajax.Event.getMouseXY(event);
		var newXY = {x: mouseXY.x-this.diff.x, y: mouseXY.y-this.diff.y};
		
		ajax.GUI.setXY(this.element, newXY.x, newXY.y);
		ajax.Event.stopEvent(event);
	},
	
	doMouseUp: function(e){
		if(!this.selected) return false;
		
		this.selected = false;
		this.diff = null;
		
		var event = window.event || e;
		
		if(this.dragging){
			this.dragging = false;
			ajax.GUI.setOpacity(this.element, 1.0);
		}
		//ajax.GUI.setXY(this.element, 300, 300);
		
		ajax.Event.removeListener(document, "mousemove", this.mouseMove);
		ajax.Event.removeListener(document, "mouseup", this.mouseUp);		
	}
}



