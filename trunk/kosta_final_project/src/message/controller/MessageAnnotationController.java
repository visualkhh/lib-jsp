package message.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import message.model.MessageDAO;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MessageAnnotationController {
 private MessageDAO MessageDao;
  
 public void setMessageDao(MessageDAO messageDao) {
  this.MessageDao = messageDao;
 }
 
 
 @RequestMapping("/move_message_page.do")
 public ModelAndView openmatching_list(HttpSession session)throws Exception{ 
  
  HashMap hm = (HashMap)session.getAttribute("user");

  
  String imsi_usernum = "";
  if(hm != null){
   imsi_usernum = hm.get("user_number").toString();
  }
  
  List messageList = MessageDao.getList(Integer.parseInt(imsi_usernum));
  
  //타일즈에 정의해놓은 "list" 그리고 , "boardList"라는 이름으로  boardList 라는 오브젝트를 넘겼다.
  return new ModelAndView("message_first_page", "messageList", messageList);
  
 }
 
 

 
} 