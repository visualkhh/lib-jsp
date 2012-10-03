(function(a) {

	a.fn.island = function(d) {
		
		var dept = this;
		var plant ;
		var island_xmldata;
		if (typeof d == "string") {
				//alert('빵꾸똥꾸'+d);
				return this;
		}
		

				
		var insert_dept = function(data) {
			if (param.is_all_dept) {
				dept.append("<option  dept_cd='9999'>[전체 도서]</option>");
			}
			$(data).find("island").each(
							function(index) {
								var dept_cd = $(this).attr('dept_cd');
								var dept_nm = $(this).attr('dept_nm');
								var selectedmd = (dept_cd == param.selected_dept_cd ? "selected": "");
								dept.append("<option  " + selectedmd+ "   value='" + dept_cd+ "'   dept_cd='" + dept_cd + "'  dept_nm='" + dept_nm + "'>["+ dept_cd + "] " + dept_nm+ "</option>");
							});

			dept.trigger("change");

		}
		
		var param = {
			insert_detp : d.insert_dept==undefined?insert_dept:d.insert_dept,
			url : d.url==undefined?"":d.url,
			is_all_dept : d.is_all_dept==undefined?true:d.is_all_dept,
			plant : d.plant==undefined?"":d.plant,
			selected_dept_cd : d.selected_dept_cd==undefined?"9999":d.selected_dept_cd
		};
		
		 plant = $(param.plant);
		

		
		
		
		
		//////////change
		
		dept.change(function() {
		 	plant.find("option").remove();
            var comboValue=$(this).find("option:selected").val();
            var findplant = $(island_xmldata).find("island[dept_cd="+comboValue+"] plant");
            if(findplant.length<=1){
            	plant.hide();
            }else{
            	plant.show();
            }
            findplant.each(function (index){
				 	var plant_cd=$(this).attr('plant_cd');
					var plant_nm=$(this).attr('plant_nm');
					plant.append("<option    value='"+plant_cd+"'   plant_cd='"+plant_cd+"' plant_nm='" + plant_nm + "'>["+plant_cd+"] "+plant_nm+"</option>");						
			});
            plant.trigger("change");
	
        });
		
		
		
		
		
		
		////ajax
		
		
		
		
		

		$.ajax({
			type:"POST",
			url:param.url,
			data:{
//				"ip":$('#ip').val(),
//				"port":$('#port').val(),
//				"id":$('#id').val(),
//				"pwd":$('#pwd').val(),
//				"sid":$('#sid').val(),
//				"db":$('#db').val(),
//				"sql":$('#sql').val()
				},
			dataType:"xml",
			async:false,
			success:function(data,textStatus){
					//alert("잘보냈습니다");
				island_xmldata = data;
					dept.find("option").remove();
					param.insert_detp(data);
				/*	if(param.is_all_dept){
						detp.append("<option  dept_cd='9999'>[전체 도서]</option>");						
					}
					$(data).find("island").each(function (index){
						var dept_cd=$(this).attr('dept_cd');
						var dept_nm=$(this).attr('dept_nm');
						var selectedmd = (dept_cd==param.selected_dept_cd?"selected":"");
						detp.append("<option  "+selectedmd+"   value='"+dept_cd+"'   dept_cd='"+dept_cd+"'>["+dept_cd+"] "+dept_nm+"</option>");						
					});
					
					dept.trigger("change");
					*/
			},
			error:function(xhr,textStatus,errorThrown){
				alert('도서정보를 가져오지 못했습니다.');
			}
		});
		
		return this;
	};
	
	
})(jQuery);

