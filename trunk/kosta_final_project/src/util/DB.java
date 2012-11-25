package util;

import java.sql.*;
import javax.naming.*;
import javax.sql.*;

public class DB {
 private static DB instance = new DB();
 
 public static DB getInstance(){
  return instance;
 }
 
 public Connection getConnection() throws Exception{
  Context ctx = new InitialContext();
  DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/oracle");
  return ds.getConnection();
 }
 
 
} 