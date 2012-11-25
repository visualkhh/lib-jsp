ajax.body = {};

ajax.body.load = function(){
	this.left = document.getElementById("body-left");
	
	this.profile = document.getElementById("menu-box-profile");
	this.openpages = document.getElementById("menu-box-openpages");
	this.openresume = document.getElementById("menu-box-openresume");
	this.messages = document.getElementById("menu-box-messages");
	this.content_profile = document.getElementById("body-content-profile");
	this.content_openpages = document.getElementById("body-content-openpages");
	this.content_openresume = document.getElementById("body-content-openresume");
	this.content_messages = document.getElementById("body-content-messages");
	
	this.event1 = ajax.Event.bindAsListener(this.showprofile, this);
	this.event2 = ajax.Event.bindAsListener(this.showopenpages, this);
	this.event3 = ajax.Event.bindAsListener(this.showopenresume, this);
	this.event5 = ajax.Event.bindAsListener(this.showmessages, this);
	
	ajax.Event.addListener(this.profile, "click", this.event1);
	ajax.Event.addListener(this.openpages, "click", this.event2);
	ajax.Event.addListener(this.openresume, "click", this.event3);
	ajax.Event.addListener(this.messages, "click", this.event5);
	
}

ajax.body.load.prototype = {
	/* profile 버튼을 눌렀을때 */	
	showprofile: function(){
	
		//현하
		var conbox=document.getElementById("template-body");
		conbox.style.height="700 px";


		this.allUnselected();
		this.allContentBoxUnselected();
		this.profile.className = "body-selected-menu-box";
		this.content_profile.style.display = "block";
	},
	
	/* openpages 버튼을 눌렀을때 */
	showopenpages: function(){
		
		//현하
		var conbox=document.getElementById("template-body");
		conbox.style.height="700 px";
		
		
		this.allUnselected();
		this.allContentBoxUnselected();
		this.openpages.className = "body-selected-menu-box";
		this.content_openpages.style.display = "block";
	},
	
	/* openresume 버튼을 눌렀을때 */
	showopenresume: function(){
		
		//현하
		var conbox=document.getElementById("template-body");
		conbox.style.height="1100 px";
		
		this.allUnselected();
		this.allContentBoxUnselected();
		this.openresume.className = "body-selected-menu-box";
		this.content_openresume.style.display = "block";	
	},
		
	/* openmessages 버튼을 눌렀을때 */
	showmessages: function(){
		
		//현하
		var conbox=document.getElementById("template-body");
		conbox.style.height="700 px";
		
		this.allUnselected();
		this.allContentBoxUnselected();
		this.messages.className = "body-selected-menu-box";
		this.content_messages.style.display = "block";
	},
	
	/* 좌측 사이드바를 보여준다. */	
	showleft: function(){
		this.left.style.display="block";
	},
	
	/* 좌측 사이드바를 감춘다. */	
	hideleft: function(){
		this.left.style.display = "none";
	},
	
	/* 버튼 색깔을 모두 선택되지 않은 색상으로 바꾼다.  */	
	allUnselected: function(){
		this.profile.className="body-menu-box";
		this.openpages.className="body-menu-box";
		this.openresume.className="body-menu-box";
		this.messages.className="body-menu-box";
	},
	
	allContentBoxUnselected: function(){
		this.content_profile.style.display = "none";
		this.content_openpages.style.display = "none";
		this.content_openresume.style.display = "none";
		this.content_messages.style.display = "none";
	}
	
	

}



	


