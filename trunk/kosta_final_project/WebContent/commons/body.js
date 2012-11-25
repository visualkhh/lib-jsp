ajax.body = {};

var flag = true;

ajax.body.load = function(){
	this.left = document.getElementById("body-left");
	
	this.profile = document.getElementById("menu-box-profile");
	this.openpages = document.getElementById("menu-box-openpages");
	this.openresume = document.getElementById("menu-box-openresume");
	this.openproject = document.getElementById("menu-box-openproject");
	this.messages = document.getElementById("menu-box-messages");
	this.content_profile = document.getElementById("body-content-profile");
	this.content_openpages = document.getElementById("body-content-openpages");
	this.content_openresume = document.getElementById("body-content-openresume");
	this.content_openproject = document.getElementById("body-content-openproject");
	this.content_messages = document.getElementById("body-content-messages");
	
	this.event1 = ajax.Event.bindAsListener(this.showprofile, this);
	this.event2 = ajax.Event.bindAsListener(this.showopenpages, this);
	this.event3 = ajax.Event.bindAsListener(this.showopenresume, this);
	this.event4 = ajax.Event.bindAsListener(this.showopenproject, this);
	this.event5 = ajax.Event.bindAsListener(this.showmessages, this);
	
	ajax.Event.addListener(this.profile, "click", this.event1);
	ajax.Event.addListener(this.openpages, "click", this.event2);
	ajax.Event.addListener(this.openresume, "click", this.event3);
	ajax.Event.addListener(this.openproject, "click", this.event4);
	ajax.Event.addListener(this.messages, "click", this.event5);
	
}

ajax.body.load.prototype = {
	/* profile ��ư�� �������� */	
	showprofile: function(){
		this.allUnselected();
		this.allContentBoxUnselected();
		this.profile.className = "body-selected-menu-box";
		this.content_profile.style.display = "block";
	},
	
	/* openpages ��ư�� �������� */
	showopenpages: function(){
		this.allUnselected();
		this.allContentBoxUnselected();
		this.openpages.className = "body-selected-menu-box";
		this.content_openpages.style.display = "block";
	},
	
	/* openresume ��ư�� �������� */
	showopenresume: function(){
		this.allUnselected();
		this.allContentBoxUnselected();
		this.openresume.className = "body-selected-menu-box";
		this.content_openresume.style.display = "block";	
	},
	
	/* openproject ��ư�� �������� */
	showopenproject: function(){
		this.allUnselected();
		this.allContentBoxUnselected();
		this.openproject.className = "body-selected-menu-box";
		this.content_openproject.style.display = "block";	
	},	
	
	/* openmessages ��ư�� �������� */
	showmessages: function(){
		this.allUnselected();
		this.allContentBoxUnselected();
		this.messages.className = "body-selected-menu-box";
		this.content_messages.style.display = "block";
		
	},
	
	/* ���� ���̵�ٸ� �����ش�. */	
	showleft: function(){
		this.left.style.display="block";
	},
	
	/* ���� ���̵�ٸ� �����. */	
	hideleft: function(){
		this.left.style.display = "none";
	},
	
	/* ��ư ������ ��� ���õ��� ���� �������� �ٲ۴�.  */	
	allUnselected: function(){
		this.profile.className="body-menu-box";
		this.openpages.className="body-menu-box";
		this.openresume.className="body-menu-box";
		this.openproject.className="body-menu-box";
		this.messages.className="body-menu-box";
	},
	
	allContentBoxUnselected: function(){
		this.content_profile.style.display = "none";
		this.content_openpages.style.display = "none";
		this.content_openresume.style.display = "none";
		this.content_openproject.style.display = "none";
		this.content_messages.style.display = "none";
	}
}



	


