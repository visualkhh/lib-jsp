ajax.header = {};

ajax.header.load = function(){
	this.inputbox = document.getElementById("menu-search");
	this.event1 = ajax.Event.bindAsListener(this.inputboxListener, this);
	ajax.Event.addListener(this.inputbox, "click", this.event1);
}
ajax.header.load.prototype = {
	/* profile ��ư�� �������� */	
	inputboxListener: function(){
		alert("INPUTBOX");		
	}
}
	


