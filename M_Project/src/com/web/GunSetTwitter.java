package com.web;

import javax.servlet.http.HttpServletRequest;

import khh.db.connection.pool.ConnectionMultiPool;
import khh.debug.LogK;
import khh.web.jsp.framework.commet.longpolling.Gun;

import org.apache.catalina.CometEvent;


public class GunSetTwitter extends Gun {
	ConnectionMultiPool pool = ConnectionMultiPool.getInstance();
	LogK log  =  LogK.getInstance();
	@Override
	public Object trigger() throws Exception {
		CometEvent event = getCometEventList().get(0);
		HttpServletRequest request  = event.getHttpServletRequest();
		String msg = request.getParameter("msg");
		
//		final Connection cpp =  pool.getConnection("mproject");
//        DBTerminal dbterminal = new DBTerminal(new ConnectionCreator_I() {
//            public Connection getMakeConnection() throws Exception {
//                return cpp;
//            }
//        });
//        
//        
//        Adapter_Base<String, Object> param = new Adapter_Base<String, Object>() {
//        };
//        param.add("hit",436);
//        param.add("name","관리자");
//        DBTResultSetContainer result = dbterminal.executeMapQuery("cool",param);
//        //DBTResultSetContainer result  = dbterminal.executeQuery("select * from user");
//        for (int i = 0; i < result.size(); i++) {
//            DBTResultRecord recode = result.get(i);
//            msg+=(recode.getString("contents"));
//        }
//        log.debug(msg);
//        msg = StringUtil.stringCharSetConversion(msg, StringUtil.SET_UTF_8, StringUtil.SET_8859_1);
//		//ConnectionWebUtil.getConnectionByJNDI("jndi/M")
		
        
		GunTwitter.messages.put(msg);
		return "good send("+msg+")";
	}
}
