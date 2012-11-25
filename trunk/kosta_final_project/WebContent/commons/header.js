ajax.header = {};

ajax.header.load = function(){
	this.inputbox = document.getElementById("menu-search");
	this.event1 = ajax.Event.bindAsListener(this.inputboxListener, this);
	ajax.Event.addListener(this.inputbox, "click", this.event1);
}
ajax.header.load.prototype = {
	/* profile 버튼을 눌렀을때 */	
	inputboxListener: function(){
		alert("INPUTBOX");		
	}
}
	


