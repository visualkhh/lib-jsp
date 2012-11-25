<%@ page language="java" contentType="text/html; Zharset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.io.File"%>
<%@page import="java.io.BufferedInputStream"%>
<%@page import="java.io.BufferedOutputStream"%>
<%@page import="java.io.FileInputStream"%>
<%
 String file_dir = (String)request.getAttribute("file_dir");
 String file_physic = (String)request.getAttribute("file_physic");
 String file_logic = (String)request.getAttribute("file_logic");
 
 //TIP!
 //자바스크립트를 사용하여 GET 방식으로 전송된 파라미터는 반드시 전송전에 
 //encodeURI(value) 함수로 엔코딩해서 아래와 같이 디코드해야 한글이 손상되지 않는다.
 //
 //   var url  = "common.fileDown.ko";
 //   url += "?command=qa00001";
 //   url += "&file_physic="+phy;
 //   url += "&file_logic="+encodeURI(log,"UTF-8");
 file_logic = java.net.URLDecoder.decode(file_logic,"UTF-8");
 
 //통신은 was 설정대로 utf
 //response 헤더에 쓸때는 한글로~ 아니면 오류난다. filename 을 제대로 인식못해서 
 //content type 설정을 못한다.
 file_logic = new String(file_logic.getBytes("KSC5601"),"8859_1");
 
 String dir  = file_dir;
 File file  = new File(dir+File.separator+file_physic);
 
 BufferedInputStream  input = null;
 BufferedOutputStream output = null;
 
 response.reset();
 String strClient = request.getHeader("User-Agent");
 if(strClient.indexOf("MSIE 5.5") != -1){
  response.setHeader("Content-Disposition","filename="+file_logic+";");
 }else{
  response.setHeader("Content-Disposition","attachment; filename="+file_logic+";");
  response.setHeader("Content-Type", "application/octet-stream; Zharset=UTF-8");
 }
 response.setHeader("Content-Length",""+file.length() );
 response.setHeader("Content-Transfer-Encoding","binary;");
 response.setHeader("pragma","no-cache;" );
 response.setHeader("Expires", "-1"); 
 
 try{
  input = new BufferedInputStream(new FileInputStream(file));
  byte buffer[] = new  byte[1024];
  int  len = 0;
  
  // out.clear 를 반드시 해 주어야 한다.
  // 왜 냐 하면 jsp 에서는 기본적으로 out 라는 객체가 선언되어 있기 때문에 
  // clear 하지 않고서 아래의 response.getOutputStream() 을 호출하면 
  // getOutputStream() has already been called for this response 에러를 만나게 된다.
  out.clear();
  output = new BufferedOutputStream(response.getOutputStream());
  while((len = input.read(buffer)) > 0 ){
   output.write(buffer,0,len);
   output.flush();
  }
 }catch(Exception e){
  System.out.println("file down load failed! ");
  System.out.println("error = "+e.getStackTrace());  
 }finally{
  if(input != null) try{input.close(); }catch(Exception e){}
  if(output!= null) try{output.close(); }catch(Exception e){}
 }
%>
 
