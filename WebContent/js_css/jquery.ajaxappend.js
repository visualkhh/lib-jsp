var ajaxappend_idname ="id_append"; 
var ajaxappend_id =0; 
(function(a) {

	a.fn.ajaxappend = function(d) {
		
		var context = this;
		if (typeof d == "string") {
				//alert('빵꾸똥꾸'+d);
				return this;
		}
		

	
		
		var param = {
				url : '',
				type :'POST',
				data : {},
				dataType:"xml",
				async:false,
				autoStart:true,
				success:function(data,textStatus){
				},
				dataParser : function(data){
					$(data).find("item").each(function(index) {
						var atItem = $(this);
						context.makeElement(atItem,index);
					});
				},
				error:function(){	},
				callback: function(){},
				append: true,
				beforeElement : Array(),
				afterElement : Array(),
				makeElement : function(atItem,index){
					var child="";
					atItem.children().each(function(i) {
						child+=$(this).get(0).tagName+"='"+$(this).text()+"' ";
		            });
					var html=$("<div  "+child+" >"+$.trim(atItem.text())+"</div>");
					return html;
				}
			}
		this.setParam = function(d){
				param = $.extend({}, param, d);
		}
		this.setParam(d);
		
		
		
		this.makeElement = function(atItem,index){
			var element  =  param.makeElement(atItem,index);
			element.attr(ajaxappend_idname,ajaxappend_idname+ajaxappend_id);
			ajaxappend_id++;
			if(param.append){
				context.append(element);
			}
		}
		
		this.dataParser = function(data){
			param.dataParser(data);
		};
		
		this.start=function(){
			//before
			for ( var i = 0; i < param.beforeElement.length; i++) {
				context.append(param.beforeElement[i]);
			}
			////ajax
			$.ajax({
				type:param.type,
				url:param.url,
				data:param.data,
				dataType:param.dataType,
				async:param.async,
				success:function(data,textStatus){
				param.success(data,textStatus);   //여기안쪽에서 this.make를 불러줘야한다 리턴값은 엘리먼트
				context.dataParser(data);
					for ( var i = 0; i < param.afterElement.length; i++) {//after
						context.append(param.afterElement[i]);
					}
					param.callback(data,textStatus);
				},
				error:function(xhr,textStatus,errorThrown){
					param.error(xhr,textStatus,errorThrown);
					for ( var i = 0; i < param.afterElement.length; i++) {//after
						context.append(param.afterElement[i]);
					}
					param.callback(xhr,textStatus,errorThrown);
				}
			});
		}
	
		if(param.autoStart){
			this.start();
		}
		
		
	return this;
	};
	
})(jQuery);

