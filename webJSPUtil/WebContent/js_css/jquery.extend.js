 (function(a) {

	a.fn.extendstest = function(d) {
		if (typeof d == "string") {
			alert("String "+d);	
			return this;
		}
//		if (typeof d == "object") {
//			alert("object "+d);	
//			return this;
//		}

		
		var defaultParam = {
				width : '200px',
				height : '200px',
				opacity : '0.5'
				}
		var opts = $.extend({}, defaultParam, d);

		alert(typeof d+"   " +opts.width+"    "+opts.height+"    "+opts.opacity+"     "+opts.good);
		
		
	};
})(jQuery);

/*
jQuery.fn.extendstest = function(d) {
		alert(d);
    }
    */


//
// jQuery.fn.extend({
// 	uiflow: function(d) {
// 		return this;
//     }
// });


