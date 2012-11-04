<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<script type="text/javascript">
//case 1 
/*
function Rectangle(w, h){ 
this.width = w; 
this.height = h; 
this.area = function() { return this.width * this.height }; 
} 
Rectangle.prototype.area = function() { return this.width + this.height }; 
var rec = new Rectangle(2,8); 
alert(rec.area()); 
delete rec.area; 
alert(rec.area()); 

// case 2 
function Rectangle(w, h){ 
this.width = w; 
this.height = h; 
this.area = function() { return this.width * this.height }; 
} 

var rec = new Rectangle(2,8); 
rec.area = function() { return this.width + this.height }; 
alert(rec.area()); 
delete rec.area; 
alert(rec.area());
*/
//case 3 

SUB.prototype = new Object();
SUB.prototype.state="sub_state";
SUB.prototype.gogo  = function(){
	alert("sub"+this.state);
};
function SUB(){}

SUPER.prototype = new Object();
SUPER.prototype.state="super_state";
SUPER.prototype.sub = null;
function SUPER(){
	this.sub = new SUB();
	this.sub.state=this.state+"    --r";
	this.sub.gogo = function(){
		alert("SUPER "+this.state);
	};
};

var s = new SUPER();
s.sub.gogo();

</script>
<body>

</body>
</html>