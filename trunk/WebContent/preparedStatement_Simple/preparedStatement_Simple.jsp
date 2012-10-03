<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>

<%


//part 1       insert 

strbuff.append("  update nto1100 a set  a.user_name=? ,a.user_pwd = ?, a.user_tel=?, a.user_email=?, a.user_ask=?, a.user_apply=?, a.user_apply_date=DECODE(a.user_apply,'Y',a.user_apply_date,"+user_apply_date_query+")  \n"); 
			strbuff.append("  		where user_id=? \n");
			
			
			
			ArrayList insert_data=new ArrayList ();
			insert_data.add(user_name);
			insert_data.add(user_pwd);
			insert_data.add(user_tel);
			insert_data.add(user_email);
			insert_data.add(user_ask);
			insert_data.add(user_apply);
			insert_data.add(user_id);
			
			pstmt =new LogPreparedStatement(conn,strbuff.toString());
			
			for(int  i =  0 ; i < insert_data.size();i++){
				pstmt.setString(i+1,(String)insert_data.get(i) );
			}
			
			
			
			
			
			
			
			
//part2     select  where

			strbuff.append("  SELECT B.NTECH_ID,(SELECT CODE_NAME FROM NTT1080 WHERE CODE = B.GUBUN) GUBUN_NM ,B.GUBUN   \n");
			strbuff.append("  ,(SELECT CODE_NAME FROM NTT1080 WHERE CODE = B.STATE) STATE_NM , B.STATE ,B.NTECH_NO, B.NTECH_NM,    \n");
			strbuff.append("  DEV_FROM_DATE,DEV_TO_DATE,   \n");
			strbuff.append("  B.MODEL_OPER_FROM_DATE, B.MODEL_OPER_TO_DATE,   \n");
			strbuff.append("  B.PROT_FROM_DATE, B. PROT_TO_DATE,   \n");
			strbuff.append("  B.OPER_DATE ,  B.NTECH_APPLY, \n");
			strbuff.append("  B.RSLT_KEPCO,B.RSLT_COMP,B.RSLT_ENT, \n");
			strbuff.append("  B.NTECH_OUTLINE,B.USE_EFECT,\n");
			strbuff.append("  B.MINUS_MNY, \n");
			strbuff.append("  C.COMP_NM,C.COMP_NO  \n");
			strbuff.append("    FROM NTT1010 B , NTT1030 C  \n");
			strbuff.append("  WHERE   \n");
			strbuff.append("    (B.NTECH_COM_NO = C.COMP_NO OR NTECH_COM_NO2= C.COMP_NO OR NTECH_COM_NO3 = C.COMP_NO)   \n");
			
		 
			ArrayList insert_data=new ArrayList ();
			if(comp_no!=null && !comp_no.equals("ALL") && comp_no.length()>0){
				strbuff.append("  and comp_no=? " );
				insert_data.add(comp_no);
			}
			if(ntech_apply!=null && ntech_apply.length()>0){
				strbuff.append("  and ntech_apply=? " );
				insert_data.add(ntech_apply);
			}
			if(ntech_id!=null && ntech_id.length()>0){
				strbuff.append("  and ntech_id=? " );
				insert_data.add(ntech_id);
			}
			strbuff.append(" ORDER BY NTECH_ID " );
			
			pstmt =new LogPreparedStatement(conn,strbuff.toString());
			for(int  i =  0 ; i < insert_data.size();i++){
				pstmt.setString(i+1,(String)insert_data.get(i) );
			}


//part 3


			strbuff = new StringBuffer();
			strbuff.setLength(0);

			 //a.user_name=? ,a.user_pwd = ?, a.user_tel=?, a.user_email=?, a.user_ask=?, a.user_apply=?, a.user_apply_date=DECODE(a.user_apply,'Y',a.user_apply_date,"+user_apply_date_query+")  \n");
			strbuff.append("  update  ntt1010  a set   seq_no = seq_no  \n"); 
			
			
			ArrayList insert_data=new ArrayList ();
			
			if(gubun!=null&&gubun.length()>0){
				strbuff.append(" ,a.gubun = ? \n");
				insert_data.add(gubun); 
				}
				if(state!=null&&state.length()>0){
				strbuff.append(" ,a.state = ? \n");
				insert_data.add(state); 
				}
				if(ntech_nm!=null&&ntech_nm.length()>0){
				strbuff.append(" ,a.ntech_nm = ? \n");
				insert_data.add(ntech_nm); 
				}
				if(ntech_no!=null&&ntech_no.length()>0){
				strbuff.append(" ,a.ntech_no = ? \n");
				insert_data.add(ntech_no); 
				}
				if(ntech_comp_no!=null&&ntech_comp_no.length()>0){
				strbuff.append(" ,a.ntech_comp_no = ? \n");
				insert_data.add(ntech_comp_no); 
				}
				if(ntech_com_no!=null&&ntech_com_no.length()>0){
				strbuff.append(" ,a.ntech_com_no = ? \n");
				insert_data.add(ntech_com_no); 
				}
				if(ntech_comp_nm!=null&&ntech_comp_nm.length()>0){
				strbuff.append(" ,a.ntech_comp_nm = ? \n");
				insert_data.add(ntech_comp_nm); 
				}
				if(dev_from_date!=null&&dev_from_date.length()>0){
				strbuff.append(" ,a.dev_from_date = ? \n");
				insert_data.add(dev_from_date); 
				}
				if(dev_to_date!=null&&dev_to_date.length()>0){
				strbuff.append(" ,a.dev_to_date = ? \n");
				insert_data.add(dev_to_date); 
				}
				if(model_oper_from_date!=null&&model_oper_from_date.length()>0){
				strbuff.append(" ,a.model_oper_from_date = ? \n");
				insert_data.add(model_oper_from_date); 
				}
				if(model_oper_to_date!=null&&model_oper_to_date.length()>0){
				strbuff.append(" ,a.model_oper_to_date = ? \n");
				insert_data.add(model_oper_to_date); 
				}
				if(prot_from_date!=null&&prot_from_date.length()>0){
				strbuff.append(" ,a.prot_from_date = ? \n");
				insert_data.add(prot_from_date); 
				}
				if(prot_to_date!=null&&prot_to_date.length()>0){
				strbuff.append(" ,a.prot_to_date = ? \n");
				insert_data.add(prot_to_date); 
				}
				if(oper_date!=null&&oper_date.length()>0){
				strbuff.append(" ,a.oper_date = ? \n");
				insert_data.add(oper_date); 
				}
				if(rslt_kepco!=null&&rslt_kepco.length()>0){
				strbuff.append(" ,a.rslt_kepco = ? \n");
				insert_data.add(rslt_kepco); 
				}
				if(rslt_comp!=null&&rslt_comp.length()>0){
				strbuff.append(" ,a.rslt_comp = ? \n");
				insert_data.add(rslt_comp); 
				}
				if(rslt_ent!=null&&rslt_ent.length()>0){
				strbuff.append(" ,a.rslt_ent = ? \n");
				insert_data.add(rslt_ent); 
				}
				if(ntech_outline!=null&&ntech_outline.length()>0){
				strbuff.append(" ,a.ntech_outline = ? \n");
				insert_data.add(ntech_outline); 
				}
				if(use_efect!=null&&use_efect.length()>0){
				strbuff.append(" ,a.use_efect = ? \n");
				insert_data.add(use_efect); 
				}
				if(ebook_url!=null&&ebook_url.length()>0){
				strbuff.append(" ,a.ebook_url = ? \n");
				insert_data.add(ebook_url); 
				}
				if(sabun!=null&&sabun.length()>0){
				strbuff.append(" ,a.sabun = ? \n");
				insert_data.add(sabun); 
				}
				if(regname!=null&&regname.length()>0){
				strbuff.append(" ,a.regname = ? \n");
				insert_data.add(regname); 
				}
				if(paste_file!=null&&paste_file.length()>0){
				strbuff.append(" ,a.paste_file = ? \n");
				insert_data.add(paste_file); 
				}
				if(ntech_com_no2!=null&&ntech_com_no2.length()>0){
				strbuff.append(" ,a.ntech_com_no2 = ? \n");
				insert_data.add(ntech_com_no2); 
				}
				if(ntech_com_no3!=null&&ntech_com_no3.length()>0){
				strbuff.append(" ,a.ntech_com_no3 = ? \n");
				insert_data.add(ntech_com_no3); 
				}
				if(ntech_comp_nm2!=null&&ntech_comp_nm2.length()>0){
				strbuff.append(" ,a.ntech_comp_nm2 = ? \n");
				insert_data.add(ntech_comp_nm2); 
				}
				if(ntech_comp_nm3!=null&&ntech_comp_nm3.length()>0){
				strbuff.append(" ,a.ntech_comp_nm3 = ? \n");
				insert_data.add(ntech_comp_nm3); 
				}
				if(minus_mny!=null&&minus_mny.length()>0){
				strbuff.append(" ,a.minus_mny = ? \n");
				insert_data.add(minus_mny); 
				}
				if(set_ug!=null&&set_ug.length()>0){
				strbuff.append(" ,a.set_ug = ? \n");
				insert_data.add(set_ug); 
				}
				if(reduce_amt_nm!=null&&reduce_amt_nm.length()>0){
				strbuff.append(" ,a.reduce_amt_nm = ? \n");
				insert_data.add(reduce_amt_nm); 
				}
		/*		
				if(reduce_amt!=null&&reduce_amt.length()>0){
				strbuff.append(" ,a.reduce_amt = ? \n");
				insert_data.add(reduce_amt); 
				}
		*/
				if(reduce_amt_type!=null&&reduce_amt_type.length()>0){
				strbuff.append(" ,a.reduce_amt_type = ? \n");
				insert_data.add(insert_data); 
				}
				if(ntech_apply!=null&&ntech_apply.length()>0){
				strbuff.append(" ,a.ntech_apply = ? \n");
				insert_data.add(ntech_apply); 
				}
			 
			
			insert_data.add(ntech_id);
			strbuff.append("  		where a.ntech_id=? \n");
			
			
			
			pstmt =new LogPreparedStatement(conn,strbuff.toString());
			
			
			for(int  i =  0 ; i < insert_data.size();i++){
				pstmt.setString(i+1,(String)insert_data.get(i) );
			}
			
			System.out.println( ((LogPreparedStatement)pstmt).getQueryString());
			
			rs = pstmt.executeUpdate();


%>
</body>
</html>