package member.model;

import java.util.ArrayList;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.ibatis.SqlMapClientTemplate;


public class MemberDAO {
	private SqlMapClientTemplate myJdbcTemplate;
	private JdbcTemplate imsi_myJdbcTemplate;
	  
	public void setMyJdbcTemplate(SqlMapClientTemplate myJdbcTemplate) {		
		this.myJdbcTemplate = myJdbcTemplate;
	}
	 
	public void setImsi_myJdbcTemplate(JdbcTemplate imsi_myJdbcTemplate) {		
		this.imsi_myJdbcTemplate = imsi_myJdbcTemplate;
	}
	
	public void insert_user(MemberDTO dto){
		myJdbcTemplate.update("insert_user", dto);
	}
	
	public void insert_company(MemberDTO dto){
		myJdbcTemplate.update("insert_company", dto);
	}
	
	public MemberDTO get_usernumber(String jumin2){		
		return (MemberDTO)myJdbcTemplate.queryForObject("get_usernumber", jumin2);
	}
	
	public MemberDTO get_companynumber(String licensenumber){		
		return (MemberDTO)myJdbcTemplate.queryForObject("get_companynumber", licensenumber);
	}
	
	public MemberDTO get_usernumber_id(String user_id){		
		return (MemberDTO)myJdbcTemplate.queryForObject("get_usernumber_id", user_id);
	}
	
	public MemberDTO get_companynumber_id(String company_id){		
		return (MemberDTO)myJdbcTemplate.queryForObject("get_companynumber_id", company_id);
	}
	
	public int check_login_user(MemberDTO dto){		
		return (Integer)myJdbcTemplate.queryForObject("check_login_user", dto);		 		
	}
	
	public int check_login_company(MemberDTO dto){		
		return (Integer)myJdbcTemplate.queryForObject("check_login_company", dto);		 		
	}
	
	public ArrayList getOpenpage_info(int user_number){
		return (ArrayList)myJdbcTemplate.queryForList("openpage_info", user_number);
	}
	
	public void insert_resume(ResumeDTO dto){
		myJdbcTemplate.update("insert_resume", dto);
	}
	
	public ResumeDTO read_resume(int user_number){
		return (ResumeDTO)myJdbcTemplate.queryForObject("read_resume", user_number);
	}
//	public int check_jumin(String jumin){	
//		return (Integer)myJdbcTemplate.queryForObject("check_jumin", jumin);
//	}
//	
//	public int check_license(String license){		
//		return (Integer)myJdbcTemplate.queryForObject("check_license", license);
//	}
}
