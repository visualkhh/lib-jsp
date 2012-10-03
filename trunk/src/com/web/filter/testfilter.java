package com.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class testfilter implements Filter {

	public void destroy() {
		// TODO Auto-generated method stub

	}
	

	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain arg2) throws IOException, ServletException {
		
		if(req.getCharacterEncoding()==null){
			req.setCharacterEncoding("euc-kr");
		}
		arg2.doFilter(req, res);//체인어걸어야지 이어진다.
		
		//System.out.println(req.getRemoteAddr()+"init doFilter"+req+res+arg2);
		// TODO Auto-generated method stub

	}
private FilterConfig filterconfig =null;
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		filterconfig  =  arg0;
//System.out.println("init filter"+arg0+"      "+arg0.getInitParameter("gogo"));
	}

}
