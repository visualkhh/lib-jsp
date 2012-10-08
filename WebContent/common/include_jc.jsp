<%@page import="khh.property.util.PropertyUtil"%>
<%@page import="khh.collection.DuplicationArrayList"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.web.UtilWeb"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%

//System.out.print("include");
String cssstr		= request.getParameter(UtilWeb.INCLUDE_PARAM_CSS);
String[] css 		= cssstr==null?new String[]{}:cssstr.split("\\"+UtilWeb.INCLUDE_PARAMSPLIT);

String javascriptstr		= request.getParameter(UtilWeb.INCLUDE_PARAM_JAVASCRIPT);
String[] javascript 		= javascriptstr==null?new String[]{}:javascriptstr.split("\\"+UtilWeb.INCLUDE_PARAMSPLIT);

out.println("<!--  //css : "+cssstr+"     javascriptstr : "+javascriptstr+"  -->");


String jqgridrootpath=request.getContextPath()+"/js_css";
DuplicationArrayList printdata = new DuplicationArrayList();

//css
	for (int i  = 0 ; i <css.length;i++){
		String getstr = css[i].trim();
		if(getstr.equals(UtilWeb.INCLUDE_PARAMVALUE_JQUERY)){
			printdata.add("<link rel='stylesheet' type='text/css' media='screen' href='"+jqgridrootpath+"/themes/redmond/jquery-ui-1.8.2.custom.css' />");
		}else if(getstr.equals(UtilWeb.INCLUDE_PARAMVALUE_JQUERYUI)){
			printdata.add("<link rel='stylesheet' type='text/css' media='screen' href='"+jqgridrootpath+"/themes/redmond/jquery-ui-1.8.2.custom.css' />");
			
			printdata.add("<style type=\"text/css\">"+PropertyUtil.getSeparator()+
			"/*demo page css*/"+PropertyUtil.getSeparator()+
			"body{ font: 62.5% \"Trebuchet MS\", sans-serif; margin: 50px;}"+PropertyUtil.getSeparator()+
			".demoHeaders { margin-top: 2em; }"+PropertyUtil.getSeparator()+
			"#dialog_link {padding: .4em 1em .4em 20px;text-decoration: none;position: relative;}"+PropertyUtil.getSeparator()+
			"#dialog_link span.ui-icon {margin: 0 5px 0 0;position: absolute;left: .2em;top: 50%;margin-top: -8px;}"+PropertyUtil.getSeparator()+
			"ul#icons {margin: 0; padding: 0;}"+PropertyUtil.getSeparator()+
			"ul#icons li {margin: 2px; position: relative; padding: 4px 0; cursor: pointer; float: left;  list-style: none;}"+PropertyUtil.getSeparator()+
			"ul#icons span.ui-icon {float: left; margin: 0 4px;}"+PropertyUtil.getSeparator()+
		"</style>");	
		}else if(getstr.equals(UtilWeb.INCLUDE_PARAMVALUE_JQGRID)){
			printdata.add("<link rel='stylesheet' type='text/css' media='screen' href='"+jqgridrootpath+"/themes/redmond/jquery-ui-1.8.2.custom.css' />");
			printdata.add("<link rel='stylesheet' type='text/css' media='screen' href='"+jqgridrootpath+"/themes/ui.jqgrid.css' />");
			printdata.add("<link rel='stylesheet' type='text/css' media='screen' href='"+jqgridrootpath+"/themes/ui.multiselect.css' />");
			
			printdata.add(" <style>   "+PropertyUtil.getSeparator()
					+" html, body, div,tr,td {   "+PropertyUtil.getSeparator()
					+" 	margin: 0;			/* Remove body margin/padding */  "+PropertyUtil.getSeparator()
					+" 	padding: 0;          "+PropertyUtil.getSeparator() 
					+" 	overflow: hidden;	/* Remove scroll bars on browser window */	 "+PropertyUtil.getSeparator() 
					+"     font-size: 85%;   "+PropertyUtil.getSeparator() 
					+" }     </style>  "+PropertyUtil.getSeparator()); 
		}
	}


	
	//javascript
	for (int i  = 0 ; i <javascript.length;i++){
		String getstr = javascript[i].trim();
		if(getstr.equals(UtilWeb.INCLUDE_PARAMVALUE_JQUERY)){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
		}else if(getstr.equals(UtilWeb.INCLUDE_PARAMVALUE_JQUERYUI)){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
		}else if(getstr.equals(UtilWeb.INCLUDE_PARAMVALUE_JQGRID)){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/i18n/grid.locale-en.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery.jqGrid.min.js' type='text/javascript'></script>");
		}else if(getstr.equals("island")){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery.kdn.isl.island.js' type='text/javascript'></script>");
		}else if(getstr.equals("selectutil")){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery.kdn.selectutil.js' type='text/javascript'></script>");
		}else if(getstr.equals("ajaxappend")){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery.ajaxappend.js' type='text/javascript'></script>");
		}else if(getstr.equals("uiflow")){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery.uiflow.js' type='text/javascript'></script>");
		}else if(getstr.equals("jqutil")){
			printdata.add("<script src='"+jqgridrootpath+"/jquery.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery-ui-1.8.2.custom.min.js' type='text/javascript'></script>");
			printdata.add("<script src='"+jqgridrootpath+"/jquery.kdn.util.js' type='text/javascript'></script>");
		}
	}
	

	ArrayList d_data = printdata.getDistinct();
	for(int  i = 0 ; i < d_data.size() ; i ++){
		out.println(d_data.get(i));
	}

%>