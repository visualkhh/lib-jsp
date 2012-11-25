(function(a) {

	a.fn.selectutil = function(d) {
		
		var select = this;
		var plant ;
		if (typeof d == "string") {
				//alert('빵꾸똥꾸'+d);
				return this;
		}
		

				
		
		var defaultParam = {
				url : '',
				type :'POST',
				data : {},
				async:false,
				callback: function(data){},
				append: false,
				before_option : Array(),
				after_option : Array(),
				selected_value : ''
				}
		var param = $.extend({}, defaultParam, d);
		

		
		
		
		////ajax
		$.ajax({
			type:param.type,
			url:param.url,
			data:param.data,
			dataType:"xml",
			async:param.async,
			success:function(data,textStatus){
				if(!param.appand)
					select.find("option").remove();

				
				//before
				for ( var i = 0; i < param.before_option.length; i++) {
					select.append(param.before_option[i]);
				}
				

				$(data).find("item").each(
							function(index) {
								var value = $(this).attr('value');
								var text = $(this).attr('text');
								var selectedmd = (value == param.selected_value ? "selected": "");
								var child="";
								$(this).children().each(function(i) {
									child+=$(this).get(0).tagName+"='"+$.trim($(this).text())+"'";
					            });
								select.append("<option  " + selectedmd+ "  "+child+"  value='" + value+ "'  >" + text + "</option>");
							});
				
				//after
				for ( var i = 0; i < param.after_option.length; i++) {
					select.append(param.after_option[i]);
				}
				
				param.callback(textStatus);
			},
			error:function(xhr,textStatus,errorThrown){
				alert('정보를 가져오지 못했습니다.');
				param.callback(textStatus);
			}
		});
		
		return this;
	};
	
})(jQuery);

