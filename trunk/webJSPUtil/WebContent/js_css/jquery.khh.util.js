jQuery.extend({
	xml: function(d) {
		
		var browserName = navigator.appName;
		var doc;
		if (browserName == 'Microsoft Internet Explorer')
		{
		doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.async = 'false'
		doc.loadXML(d);
		} else {
		doc = (new DOMParser()).parseFromString(string, 'text/xml');
		}
		return $(doc);
	}
});

//util.js 에서 구현했으니 이건 쓰지마세요
//jQuery.fn.extend({
//	uiflow : function(d) {
//		var context = this;
//		if (typeof d != "object") {
//			alert("no parameter");
//			return this;
//		}
//		var defaultParam = {
//			onBeforeProcess : function() {
//			},
//			onViewSetting : function() {
//			},
//			onDataSetting : function() {
//			},
//			onAddListener : function() {
//			},
//			onAction : function(gb) {
//			},
//			onAfterProcess : function() {
//			},
//			dispose : function() {
//			},
//			autoStart : false
//		};
//		context = $.extend({}, defaultParam, d); /*
//													 * var param = $.extend({},
//													 * defaultParam, d);
//													 * context.onBeforeProcess =
//													 * param.onBeforeProcess;
//													 * context.onViewSetting =
//													 * param.onViewSetting;
//													 * context.onDataSetting =
//													 * param.onDataSetting;
//													 * context.onAddListener =
//													 * param.onAddListener;
//													 * context.onAction =
//													 * param.onAction;
//													 * context.onAfterProcess =
//													 * param.onAfterProcess;
//													 * context.dispose =
//													 * param.dispose;
//													 * context.autoStart =
//													 * param.autoStart;
//													 */
//		$(window).unload(function() {
//			context.dispose();
//		});
//		context.flow = function() {
//			context.onBeforeProcess();
//			context.onViewSetting();
//			context.onDataSetting();
//			context.onAddListener();
//			context.onAfterProcess();
//		};
//		if (context.autoStart) {
//			context.flow();
//		}
//		return context;
//	}
//});
//

/*ajaxLoop�� ������.
jQuery.fn.extend({
	ajaxloop : function(d) {
		var context = this;
		if (typeof d != "object") {
			alert("no parameter");
			return this;
		}
		var defaultParam = {
				loop:true,
				autoStart : false
		};
		context = $.extend({}, defaultParam, d); 
		this.start=function(){
			
		};
		return context;
	}
});

*/





