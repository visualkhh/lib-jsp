<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
   <script type="text/javascript">
       var httpRequest = null;
       function getXMLHttpRequest() {
             if (window.ActiveXObject) {
                    try {
              return new ActiveXObject("Msxml2.XMLHTTP");
                    } catch(e) {
                           try {
                                 return new ActiveXObject("Microsoft.XMLHTTP");
                           } catch(e1) {
                                 return null;
                           }
                    }
             } else if (window.XMLHttpRequest) {
                    return new XMLHttpRequest();
             } else {
                    return null;
             }
       }
       function load(url) {
          httpRequest = getXMLHttpRequest();
          httpRequest.onreadystatechange = viewMessage;
          httpRequest.open("POST", url, true);
          httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
          httpRequest.setRequestHeader("Cache-Control", "no-cache, must-revalidate");
          httpRequest.setRequestHeader("Pragma", "no-cache");
      	
          httpRequest.send("type=aaaaa&name=ggg");
       }
       function viewMessage(a,b,c,d,e,f,g) {
    	   var t = this;
    	   var h = httpRequest;
             if (httpRequest.readyState == 4) {
                    if (httpRequest.status == 200) {
                           alert(httpRequest.responseText);
                    } else {
                           alert("½ÇÆÐ: "+httpRequest.status);
                    }
             }
       }
       </script>
</head>
<body>
<input type="button"value="simple.txt"onclick="load('simple.txt')"/>
<input type="button"value="simple2.txt"onclick="load('simple2.txt')"/>
<input type="button"value="simple.jsp"onclick="load('./text.jsp')"/>
<input type="button"value="simple2.jsp"onclick="load('simple2.jsp')"/>
<form action="./text.jsp" method="post">
<input name="type" >
<input name="name" >
<input type="submit" value="aaaaa">
</form>
</body>
</html>
