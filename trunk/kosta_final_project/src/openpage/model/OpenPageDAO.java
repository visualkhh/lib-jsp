package openpage.model;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import java.util.*;

public class OpenPageDAO {
	private SqlMapClientTemplate myJdbcTemplate;
	private JdbcTemplate imsi_myJdbcTemplate;
	  
	public void setMyJdbcTemplate(SqlMapClientTemplate myJdbcTemplate) {
		this.myJdbcTemplate = myJdbcTemplate;
	}
	 
	public void setImsi_myJdbcTemplate(JdbcTemplate imsi_myJdbcTemplate) {
		this.imsi_myJdbcTemplate = imsi_myJdbcTemplate;
	}
	 public List openpage_list(int user_number){
         return myJdbcTemplate.queryForList("openpage_selectopenpagelist",user_number);
   }
	
	 public void  openpage_insert(OpenPageListDTO openpagelistdto){
		 myJdbcTemplate.insert("openpage_insert",openpagelistdto);
		 myJdbcTemplate.insert("openpage_insert_before_setting",openpagelistdto);
		 myJdbcTemplate.insert("openpage_insert_before_pagelist",openpagelistdto);
	 }
	 public void  openpage_delete(String openpage_number){
		 myJdbcTemplate.delete("openpage_delete_before_reference",openpage_number);
		 myJdbcTemplate.delete("openpage_delete_before_portfolio",openpage_number);
		 myJdbcTemplate.delete("openpage_delete_before_pagelist",openpage_number);
		 myJdbcTemplate.delete("openpage_delete_before_board" ,openpage_number);
		 myJdbcTemplate.delete("openpage_delete_before_setting" ,openpage_number);
		 myJdbcTemplate.delete("openpage_delete" ,openpage_number);
		 
		 
		 
	 }
	 
	
}
