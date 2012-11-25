<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Layouts</title>
<% 
	String page_lay = request.getParameter("radio"); 
%>
<link rel="stylesheet" type="text/css" href="<%=page_lay %>.css" />
</head>

<body>

   <!-- Begin Wrapper -->
   <div id="wrapper">
   
         <!-- Begin Header -->
         <div id="header">
		 
		       This is the Header		 
			   
		 </div>
		 <!-- End Header -->
		 
		 <!-- Begin Navigation -->
         <div id="navigation">
		 
		      		 
			   
		 </div>
		 <!-- End Navigation -->
		 
		 <!-- Begin Left Column -->
		 <div id="leftcolumn">
		 
		       Left Column
		 
		 </div>
		 <!-- End Left Column -->
		 
		 <!-- Begin Right Column -->
		<%if(!page_lay.equals("layout3")){ %>
		 <div id="rightcolumn">
		       
	          <a href="layout_edit.jsp">CSS Layout Edit</a>		 
		 
		 </div>
		 <%} %>
		 <!-- End Right Column -->
		 

		 
   </div>
   <!-- End Wrapper -->
   
</body>
</html>
