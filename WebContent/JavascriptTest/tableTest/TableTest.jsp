<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/JavascriptUtil/util.js"></script> 
<script type="text/javascript">
var $S=Selector;
var $E=EventUtil;
var $D=Debug;
var $DC=DocumentUtil;

 
function start(){
	var addrow = $S.ei("addrow");
	$E.addEventListener(addrow,$E.TYPE_CLICK,addrow_f);
	var deleterow = $S.ei("deleterow");
	$E.addEventListener(deleterow,$E.TYPE_CLICK,deleterow_f);
	var innerrow = $S.ei("innerrow");
	$E.addEventListener(innerrow,$E.TYPE_CLICK,innerrow_f);
};
	
	var i=1;
function addrow_f(){
	$D.debug(table_h);
	var r = null;
	
	if(inputdata.value){
		r = table_h.insertRow(inputdata.value);
	}else{
		r = table_h.insertRow();
	}
	var c = r.insertCell();
	c.innerHTML=i++;
}
function innerrow_f(){
	$D.debug(table_h);
	var r = null;
	
	if(inputdata.value){
		r = table_h.insertRow(inputdata.value);
	}else{
		r = table_h.insertRow();
	}
	
    var newRow = document.createElement("th");
    newRow.innerHTML="hhht";
    r.appendChild(newRow);
	
	var c = r.insertCell();
	c.innerHTML="<td>11111111111</td>";
}
function deleterow_f(){
	$D.debug(table_h);
	if(inputdata.value){
		table_h.deleteRow(inputdata.value);
	}else{
		table_h.deleteRow();
	}
}
	

$E.addOnloadEventListener(start);

</script>
</head>
<body> 
가<br> 
나<br>
<input type="text" id="inputdata"/>
<input type="button" id="addrow" value="addrow"/>
<input type="button" id="innerrow" value="innerrow"/>
<input type="button" id="deleterow" value="deleterow"/>


<table id="table_h" border="1" >
<tr style="display: none;"> <td>11111</td></tr>
</table>



</body>
</html>