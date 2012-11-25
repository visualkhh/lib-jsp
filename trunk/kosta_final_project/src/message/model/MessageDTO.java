package message.model;

import org.springframework.web.multipart.MultipartFile;
public class MessageDTO {
 private int user_number;
 private String message_sender;
 private String message_info;
 private String message_check;
 private String message_type;
 private String message_regdate;
 
 
 public int getUser_number() {
  return user_number;
 }
 public void setUser_number(int user_number) {
  this.user_number = user_number;
 }
 public String getMessage_sender() {
  return message_sender;
 }
 public void setMessage_sender(String message_sender) {
  this.message_sender = message_sender;
 }
 public String getMessage_info() {
  return message_info;
 }
 public void setMessage_info(String message_info) {
  this.message_info = message_info;
 }
 public String getMessage_check() {
  return message_check;
 }
 public void setMessage_check(String message_check) {
  this.message_check = message_check;
 }
 public String getMessage_type() {
  return message_type;
 }
 public void setMessage_type(String message_type) {
  this.message_type = message_type;
 }
 public String getMessage_regdate() {
  return message_regdate;
 }
 public void setMessage_regdate(String message_regdate) {
  this.message_regdate = message_regdate;
 }
} 