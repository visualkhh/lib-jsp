package openmatching.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.orm.ibatis.SqlMapClientTemplate;



public class MatchingDAO {
	private SqlMapClientTemplate myJdbcTemplate;
	private JdbcTemplate imsi_myJdbcTemplate;
	  
	public void setMyJdbcTemplate(SqlMapClientTemplate myJdbcTemplate) {		
		this.myJdbcTemplate = myJdbcTemplate;
	}
	 
	public void setImsi_myJdbcTemplate(JdbcTemplate imsi_myJdbcTemplate) {		
		this.imsi_myJdbcTemplate = imsi_myJdbcTemplate;
	}
	
	public ArrayList<ApplierDTO> get_applier_info(MatchingDTO matching){
		String query = "select * from applier where matching_number = ? and applier_type=? " +
				"order by applier_number desc";
		Object [] values = {
				matching.getMatching_number(), matching.getApplier_type()
		};
		RowMapper mappers = new RowMapper(){
			@Override
			public Object mapRow(ResultSet rs, int arg1) throws SQLException {		
				ApplierDTO dto = new ApplierDTO();								
				
				System.out.println("----------------------------------------");
				Timestamp applier_regdate = rs.getTimestamp("applier_regdate");																	
				
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");	
				String db_date1 = format.format(applier_regdate);
				String cur_date = format.format(new Date());
				format = new SimpleDateFormat("HH:mm:ss");
				String db_date2 = format.format(applier_regdate);
				
				System.out.println("db 날짜1 : " + db_date1);
				System.out.println("db 날짜2 : " + db_date2);
				System.out.println("현재 날짜 : " + cur_date);
				
				if(db_date1.equals(cur_date)){
					cur_date = db_date2;						
				}else{					
					cur_date = db_date1;
				}
				
				
								
				//dto.setMatching_number(rs.getInt("matching_number"));	
				String user_id = rs.getString("applier_id");
				String user_name = get_name(user_id);
				dto.setApplier_name(user_name);
				dto.setApplier_id(user_id);
				dto.setApplier_contents(rs.getString("applier_contents"));
				dto.setApplier_regdate(cur_date);
				dto.setApplier_carreer(rs.getString("applier_carreer"));
				dto.setApplier_phone(rs.getString("applier_phone"));
				
				return dto;
			}   
		};
		System.out.println("dfd");  
		ArrayList<ApplierDTO> list = (ArrayList<ApplierDTO>)imsi_myJdbcTemplate.query(query, values, mappers);
		return list;
	}
	
	public String get_name(String user_id){		
		return (String)myJdbcTemplate.queryForObject("get_name", user_id);		
	}
	
	public void update_complete(int matching_num){
		myJdbcTemplate.update("update_complete", matching_num);
	}
	
	public PageDTO get_project_list(String cur_page, String search, String key, String s_type){		
		PageDTO pd = new PageDTO();
		String query = "";
		
		Object[] values = null;
		
		//key = StringUtil.toHangul(key);
		
		System.out.println("페이지 : " + cur_page);
		System.out.println("검색 종류 : " + search);
		System.out.println("검색 키 : " + key);
		System.out.println("검색 타입 : " + s_type);
		if(s_type.equals("0")){	
			if(search == null || search.length() == 0){			
				query = "select count(*) from matching"; 
				values = new Object[]{};
			}
			else if(search.equals("wri")){   // 작성자 검색			
				query = "select count(*) from matching where upper(matching_writer) like upper(?)";
				values = new Object[]{"%"+key+"%"};
			}
			else if(search.equals("con")){   // 제목 + 내용 검색
				query = "select count(*) from matching where upper(matching_title) like upper(?) or upper(matching_info) like upper(?)";
				values = new Object[]{"%"+key+"%", "%"+key+"%"};
			}	
		}else if(s_type.equals("1")){
			if(search == null || search.length() == 0){			
				query = "select count(*) from matching where matching_type = 'company'"; 
				values = new Object[]{};
			}
			else if(search.equals("wri")){   // 작성자 검색			
				query = "select count(*) from matching where upper(matching_writer) like upper(?) and matching_type = 'company'";
				values = new Object[]{"%"+key+"%"};
			}
			else if(search.equals("con")){   // 제목 + 내용 검색
				query = "select count(*) from matching where (upper(matching_title) like upper(?) or upper(matching_info) like upper(?)) and matching_type = 'company'";
				values = new Object[]{"%"+key+"%", "%"+key+"%"};
			}
		}else{
			if(search == null || search.length() == 0){			
				query = "select count(*) from matching where matching_type = 'team'"; 
				values = new Object[]{};
			}
			else if(search.equals("wri")){   // 작성자 검색			
				query = "select count(*) from matching where upper(matching_writer) like upper(?) and matching_type = 'team'";
				values = new Object[]{"%"+key+"%"};
			}
			else if(search.equals("con")){   // 제목 + 내용 검색
				query = "select count(*) from matching where (upper(matching_title) like upper(?) or upper(matching_info) like upper(?)) and matching_type = 'team'";
				values = new Object[]{"%"+key+"%", "%"+key+"%"};
			}
		}
			  
		int tot = imsi_myJdbcTemplate.queryForInt(query, values);  
		
		System.out.println("토탈 글 수 : " + tot);
		
		int first = 1;
		int last = (tot - 1) / 10 + 1; //저 10은 한 페이지당 보일 글
		int prev = (Integer.parseInt(cur_page) - 1) / 10 * 10;		
		if(prev < 1) prev = 1;
		int next = prev + (10+1);
		if(next > last) next = last;
		int begin = prev + 1;
		if(prev == 1) begin = 1;
		int end = begin + 10 - 1;
		if(end > last) end = last;		
		
		// 만약 40번째 글을 보다가 검색했는데 결과가 20개가 나오면 cur_page가 4이므로
		// 아무것도 검색이 안된것처럼 보이게 되는데 그거 처리..그리고 검색후 1페이지를 바라보게 했다.
		
		//String imsi_cur_page = "";
		
		if(Integer.parseInt(cur_page) > next){
			//imsi_cur_page = prev + "";
			cur_page = "1";
		}
				
		if(s_type.equals("0")){
			if(search == null || search.length() == 0){
				values = new Object[]{cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
							"(SELECT * FROM matching order by matching_number desc) aa) WHERE PAGE = ?";
			}else if(search.equals("wri")){
				System.out.println("오긴 오는데");
				values = new Object[]{"%"+key+"%", cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
						"(SELECT * FROM matching where upper(matching_writer) like upper(?) order by matching_number desc) aa) WHERE PAGE = ?";
			}else if(search.equals("con")){
				values = new Object[]{"%"+key+"%", "%"+key+"%", cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
				"(SELECT * FROM matching where upper(matching_info) like upper(?) or upper(matching_title) like upper(?) order by matching_number desc) aa) WHERE PAGE = ?";		
			}
		}else if(s_type.equals("1")){
			if(search == null || search.length() == 0){
				values = new Object[]{cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
							"(SELECT * FROM matching where matching_type = 'company' order by matching_number desc) aa) WHERE PAGE = ?";
			}else if(search.equals("wri")){
				System.out.println("오긴 오는데");
				values = new Object[]{"%"+key+"%", cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
						"(SELECT * FROM matching where upper(matching_writer) like upper(?) and  matching_type = 'company' order by matching_number desc) aa) WHERE PAGE = ?";
			}else if(search.equals("con")){
				values = new Object[]{"%"+key+"%", "%"+key+"%", cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
				"(SELECT * FROM matching where (upper(matching_info) like upper(?) or upper(matching_title) like upper(?))" +
				"and  matching_type = 'company' order by matching_number desc) aa) WHERE PAGE = ?";		
			}
		}else{
			if(search == null || search.length() == 0){
				values = new Object[]{cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
							"(SELECT * FROM matching where matching_type = 'team' order by matching_number desc) aa) WHERE PAGE = ?";
			}else if(search.equals("wri")){
				System.out.println("오긴 오는데");
				values = new Object[]{"%"+key+"%", cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
						"(SELECT * FROM matching where upper(matching_writer) like upper(?) and  matching_type = 'team' order by matching_number desc) aa) WHERE PAGE = ?";
			}else if(search.equals("con")){
				values = new Object[]{"%"+key+"%", "%"+key+"%", cur_page};
				query = "SELECT * FROM (SELECT aa.*, FLOOR((ROWNUM - 1) /  10 + 1) PAGE FROM " +
				"(SELECT * FROM matching where (upper(matching_info) like upper(?) or upper(matching_title) like upper(?))" +
				"and  matching_type = 'team' order by matching_number desc) aa) WHERE PAGE = ?";		
			}
		}
		System.out.println("----------------------------------------");		
		
		RowMapper mappers = new RowMapper(){
			@Override
			public Object mapRow(ResultSet rs, int arg1) throws SQLException {		
				MatchingDTO dto = new MatchingDTO();
				String matching_title = "";
				
				System.out.println("----------------------------------------");
				
				matching_title = rs.getString("matching_title");
				Timestamp matching_regdate = rs.getTimestamp("matching_regdate");
												
					
				
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");	
				String db_date1 = format.format(matching_regdate);
				String cur_date = format.format(new Date());
				format = new SimpleDateFormat("HH:mm:ss");
				String db_date2 = format.format(matching_regdate);
				
				System.out.println("db 날짜1 : " + db_date1);
				System.out.println("db 날짜2 : " + db_date2);
				System.out.println("현재 날짜 : " + cur_date);
				
			
				
				if(db_date1.equals(cur_date)){
					cur_date = db_date2;						
				}else{					
					cur_date = db_date1;
				}
				
				if(matching_title.length() > 17)
					matching_title = matching_title.substring(1, 17) + " ...";
				
				dto.setMatching_number(rs.getInt("matching_number"));	
				dto.setMatching_title(matching_title);			
				dto.setMatching_writer(rs.getString("matching_writer"));
				dto.setMatching_regdate(cur_date);
				dto.setMatching_complete(rs.getString("matching_complete"));
				dto.setMatching_type(rs.getString("matching_type"));
								   
				System.out.println("안나오면 : " + dto.getMatching_complete());
				
				return dto;
			}   
		};
		System.out.println("dfd");  
		List<MatchingDTO> list = imsi_myJdbcTemplate.query(query, values, mappers);  
		System.out.println("List size : " + list.size());
		pd.setFirst(first);
		pd.setLast(last);
		pd.setPrev(prev);
		pd.setNext(next);
		pd.setBegin(begin);
		pd.setEnd(end);
		pd.setCur_page(cur_page);
		pd.setSearch(search);
		pd.setKey(key);
		pd.setArray(list);
		pd.setS_type(s_type);
		
		return pd;
	}
	
	public void insert_matching_info(MatchingDTO matching){
		myJdbcTemplate.update("insert_matching", matching);
	}
	
	public void insert_matching_position_info(MatchingDTO matching){
		myJdbcTemplate.update("insert_matching_position", matching);
	}
	
	public void update_applier_cnt(MatchingDTO matching){
		myJdbcTemplate.update("update_applier_cnt", matching);
	}
	
	public void insert_applier(ApplierDTO applier){
		myJdbcTemplate.update("insert_applier", applier);
	}
	
	public int get_matching_number(){
		return (Integer)myJdbcTemplate.queryForObject("get_matching_number");
	}
	
	public MatchingDTO get_matching_info(int matching_number){		
		return (MatchingDTO)myJdbcTemplate.queryForObject("get_matching_info", matching_number);
	}
	
	public String get_applier_type(ApplierDTO applier){
		System.out.println(applier.getApplier_id());
		System.out.println("넘버 : " + applier.getMatching_number());
		return (String)myJdbcTemplate.queryForObject("get_applier_type", applier);
	}
	
	public String get_job_value(int matching_number){		
		return (String)myJdbcTemplate.queryForObject("get_job_value", matching_number);
	}
	
	public void cancel_applier(ApplierDTO applier){
		myJdbcTemplate.update("cancel_applier", applier);
	}
	
	public String get_job_position(int matching_number){
		return (String)myJdbcTemplate.queryForObject("get_job_position", matching_number);
	}
}
