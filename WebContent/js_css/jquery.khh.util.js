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








