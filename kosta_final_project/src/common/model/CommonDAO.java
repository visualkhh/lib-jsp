package common.model;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

public class CommonDAO {
	private SqlMapClientTemplate myJdbcTemplate;
	private JdbcTemplate imsi_myJdbcTemplate;
	  
	public void setMyJdbcTemplate(SqlMapClientTemplate myJdbcTemplate) {		
		this.myJdbcTemplate = myJdbcTemplate;
	}
	 
	public void setImsi_myJdbcTemplate(JdbcTemplate imsi_myJdbcTemplate) {		
		this.imsi_myJdbcTemplate = imsi_myJdbcTemplate;
	}
}
