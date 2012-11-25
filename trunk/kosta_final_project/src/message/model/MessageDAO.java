package message.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

import message.model.MessageDTO;


import java.sql.ResultSet;

public class MessageDAO {
 private SqlMapClientTemplate myJdbcTemplate;
 private JdbcTemplate imsi_myJdbcTemplate;
   
 public void setMyJdbcTemplate(SqlMapClientTemplate myJdbcTemplate) {
  this.myJdbcTemplate = myJdbcTemplate;
 }
  
 public void setImsi_myJdbcTemplate(JdbcTemplate imsi_myJdbcTemplate) {
  this.imsi_myJdbcTemplate = imsi_myJdbcTemplate;
 }
 public List<MessageDTO> getList(int user_number){  
  String sql = "select * from message where message_sender = '쓴넘/받은넘' and message_type='r' order by user_number desc ";
  //Object [] values = {user_number};
  RowMapper mapper = new RowMapper(){
   @Override
   public Object mapRow(ResultSet rs, int arg1) throws SQLException {  
    MessageDTO dto = new MessageDTO();
    dto.setUser_number(rs.getInt("user_number")); 
    dto.setMessage_sender(rs.getString("Message_sender"));
    dto.setMessage_info(rs.getString("Message_info"));
    dto.setMessage_check(rs.getString("Message_check"));
    dto.setMessage_type(rs.getString("Message_type"));
    dto.setMessage_regdate(rs.getString("Message_regdate"));
    return dto;
   }   
  };
    
  List<MessageDTO> list = imsi_myJdbcTemplate.query(sql,  mapper);  
    
  return list;
 }

} 