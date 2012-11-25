package openpage.model;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

public class OpenPage_EditDAO {
	private SqlMapClientTemplate myJdbcTemplate;
	private JdbcTemplate imsi_myJdbcTemplate;
	  
	public void setMyJdbcTemplate(SqlMapClientTemplate myJdbcTemplate) {
		this.myJdbcTemplate = myJdbcTemplate;
	}
	 
	public void setImsi_myJdbcTemplate(JdbcTemplate imsi_myJdbcTemplate) {
		this.imsi_myJdbcTemplate = imsi_myJdbcTemplate;
	}
	
	public void layoutsave(OpenPageSettingDTO layoutdata){
		System.out.println("save"+layoutdata.getSetting_padding());
		myJdbcTemplate.update("openpage_layoutsave",layoutdata);
	}
	
	
	public void bgsave(OpenPageSettingDTO layoutdata){
		System.out.println("savebg"+layoutdata.getSetting_padding());
		myJdbcTemplate.update("openpage_bgsave",layoutdata);
	}
	public void generalsave(OpenPageSettingDTO generaldata){
		myJdbcTemplate.update("openpage_generalsave",generaldata);
		
	}
	
	 public List layoutload(String openpage_url){
		 System.out.println("zzzzzTESTDWRS load"+openpage_url);
		 List templist =myJdbcTemplate.queryForList("openpage_layoutload",openpage_url);
		 OpenPageSettingDTO tempdto= (OpenPageSettingDTO)templist.get(0);
		 return templist;
   }
	 public List generalload(String openpage_url){
		 return myJdbcTemplate.queryForList("openpage_generalload",openpage_url);
	 }
	 public List portfolioload(OpenPage_PageListDTO pagelistdto){
		 return myJdbcTemplate.queryForList("openpage_portfolioload",pagelistdto);
	 }
	 
	 public List boardload(OpenPage_PageListDTO pagelistdto) {
		 return myJdbcTemplate.queryForList("openpage_boardload",pagelistdto);
	 }
	 
	 
	 
	 public List pagesload(String openpage_url) {
			return  myJdbcTemplate.queryForList("openpage_pagesload",openpage_url);
	}
	 

	 
	 public List resumeload(int user_number) {
		 System.out.println(user_number);
		 return  myJdbcTemplate.queryForList("resume_load",user_number);
	 }
	 
	 
	 public void pagessave(OpenPage_PageListDTO openpage_pagelistdto) {
		 myJdbcTemplate.insert("openpage_pagessave",openpage_pagelistdto);
		if(openpage_pagelistdto.getPage_type().equals("O")){
			myJdbcTemplate.insert("openpage_portfoliosave",openpage_pagelistdto);
		}
	}
	 
	 
	 public void boardsave(OpenPage_BoardDTO openpage_boarddto) {
		 myJdbcTemplate.insert("openpage_boardsave",openpage_boarddto);
		}
	 
	 
	 
	 
	 public void pagesdelete(OpenPage_PageListDTO openpage_pagelistdto){
		 myJdbcTemplate.insert("openpage_pagesdelete",openpage_pagelistdto);
		 myJdbcTemplate.insert("openpage_portfoliodelete",openpage_pagelistdto);
	 }

	 public void pagesupdate(OpenPage_PageListDTO openpage_pagelistdto){
		 System.out.println(openpage_pagelistdto.getPage_name());
		 myJdbcTemplate.insert("openpage_pagesupdate",openpage_pagelistdto);
	 }
	 
	 public void pagesinfoupdate(OpenPage_PageListDTO openpage_pagelistdto){
		 System.out.println(openpage_pagelistdto.getPage_name());
		 myJdbcTemplate.insert("openpage_pagesinfoupdate",openpage_pagelistdto);
	 }
	 
	 public void titleinfoupdate(OpenPageSettingDTO layoutdata){
		 myJdbcTemplate.insert("openpage_titleinfoupdate",layoutdata);
	 }
	 
	 public void portfolioinfoupdate(OpenPage_PortFolioDTO portfoliodata){
		 myJdbcTemplate.update("openpage_portfolioinfoupdate",portfoliodata);
	 }
	 
	 public void menuinfoupdate(OpenPageSettingDTO layoutdata){
		 myJdbcTemplate.insert("openpage_menuinfoupdate",layoutdata);
	 }
	 
	public List pageload(OpenPage_PageListDTO openpage_pagelistdto){
		System.out.println(openpage_pagelistdto.getPage_url());
		System.out.println(openpage_pagelistdto.getPage_name());
		return  myJdbcTemplate.queryForList("openpage_pageload",openpage_pagelistdto);
	}
	
}
