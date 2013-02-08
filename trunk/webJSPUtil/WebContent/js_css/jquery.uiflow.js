



jQuery.fn.extend({
	uiflow: function(d) {
		var context = this;
		
		if (typeof d != "object") {
			alert("no parameter");
			return this;
		}
		
		var defaultParam = {
				onBeforeProcess : function(){
					//alert("d  onBeforeProcess");
				},
				onViewSetting : function(){
					//alert("d  onViewSetting");
				},
				onDataSetting : function(){
					//alert("d  onDataSetting");
				},
				onAddListener : function(){
					//alert("d  onAddListener");
				},
				onAction : function(gb){
					//alert("d  onAction");
				},
				onAfterProcess : function(){
					//alert("d  onAfterProcess");
				},
				dispose : function(){
					//alert("d  dispose");
				}
		}
		var param = $.extend({}, defaultParam, d);
		context.onBeforeProcess	=	param.onBeforeProcess;
		context.onViewSetting		=	param.onViewSetting;
		context.onDataSetting		=	param.onDataSetting;
		context.onAddListener		=	param.onAddListener;
		context.onAction			=	param.onAction;
		context.onAfterProcess		=	param.onAfterProcess;
		context.dispose				=	param.dispose;
		
		
		$(window).unload( function () {
			context.dispose();
		});
		
		this.flow=function(){
			this.onBeforeProcess();
			this.onViewSetting();
			this.onDataSetting();
			this.onAddListener();
			this.onAfterProcess();
		}
		
		
		
		this.flow();
		
		
        return this;
    }
});



//(function(a) {
//
//	a.fn.uiflow = function(d) {
//		alert(d);
//		
//		return this;
//	};
//})(jQuery);
/*
(function(a) {

	a.fn.uiflow = function(d) {
				if (typeof d == "string") {
				//
				return this;
		}
	};
	
	
	
})(jQuery);
*/

