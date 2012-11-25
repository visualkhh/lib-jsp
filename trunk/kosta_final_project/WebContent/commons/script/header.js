ajax.header = {};

ajax.header.load = function(){
	$("#searchInputbox").click(function() {
		$(this).val("");			
	});
	
	$("#menuPages").click(function(){
		location.href = "/final_project/common/test_tiles.do";
	});
	
	$("#menuSearch").click(function(){
		location.href = "/final_project/opensearch/opensearch_tiles.do";
	});
	
	$("#menuMatching").click(function(){
		location.href = "/final_project/openmatching/openmatching_list.do?cur_page=1&search=&key=&s_type=0";		
	});
}

ajax.header.load.prototype = {
}