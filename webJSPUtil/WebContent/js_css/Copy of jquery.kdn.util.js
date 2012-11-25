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
	,json: function(d) {
		var data = eval(d);
		return $(data);
	}

	,ajaxloop:function(d){
		
		
		
		var context = this;
		if (typeof d == "string") {
				//alert('빵꾸똥꾸'+d);
				return this;
		}
		var param = {
				url : '',
				type :'POST',
				data : {},
				datacall:null,
				dataType:"xml",
				async:true,
				autoStart:true,
				loop:true,
				success:function(data,textStatus){},
				error:function(xhr,textStatus,errorThrown){	},
				callback: function(){}
			}
		
		
		this.setParam = function(d){
				param = $.extend({}, param, d);
		}
		this.setParam(d);
		this.setLoop = function(d){
			param.loop=d;
		}
		
		
		

		
		this.start=function(){
			var sendparam=null;
			if(param.datacall){
				sendparam = param.datacall();
			}else{
				sendparam = param.data;
			}
			
//			////ajax
			$.ajax({
				type:param.type,
				url:param.url,
				data:sendparam,
				dataType:param.dataType,
				async:param.async,
				success:function(data,textStatus){
					param.success(data,textStatus);   //여기안쪽에서 this.make를 불러줘야한다 리턴값은 엘리먼트
					param.callback(data,textStatus);
					if (param.loop) {
						context.start();
					}
					},
				error:function(xhr,textStatus,errorThrown){
					if(xhr.readyState==4 && xhr.status==0){
					}else{
						param.error(xhr,textStatus,errorThrown);
						param.callback(xhr,textStatus,errorThrown);
						if (param.loop) {
							context.start();
						}
					}
				}
			});
		}
	
		if(param.autoStart){
			this.start();
		}
	return this;
	}
});








