package member.controller;


import java.io.File;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import member.model.MemberDAO;
import member.model.MemberDTO;
import member.model.ResumeDTO;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MemberAnnotationController {
	private MemberDAO memberDao;
	private MemberCommandValidator validator = new MemberCommandValidator();
	
	public void setMemberDao(MemberDAO memberDao) {		
		this.memberDao = memberDao;
	}

	@RequestMapping("/check_type.do")
	public ModelAndView test_page()throws Exception{		
		return new ModelAndView("move_select_type");
	}
	
	
	
	@RequestMapping("/join_member.do")
	public ModelAndView insert_member(@ModelAttribute("member") MemberDTO dto, HttpSession session, HttpServletRequest request)throws Exception{
		String radio = dto.getRadio();
		int user_number = 0;
		HashMap map = new HashMap();
		ArrayList al_openpage_info = new ArrayList();
		
		
		if(radio.equals("a")){
			memberDao.insert_user(dto);
			user_number = memberDao.get_usernumber(dto.getUser_jumin2()).getUser_number();						
			map.put("user_number", user_number);
			map.put("user_id", dto.getUser_id());
			map.put("user_name", dto.getUser_name());
			map.put("user_type", "user");
		}else if(radio.equals("b")){
			memberDao.insert_company(dto);	
			user_number = memberDao.get_companynumber(dto.getCompany_licensenumber()).getUser_number();
			map.put("user_number", user_number);
			map.put("user_id", dto.getCompany_id());
			map.put("user_name", dto.getCompany_name());
			map.put("user_type", "company");
		}	
		
		al_openpage_info = memberDao.getOpenpage_info(user_number); 
		
		map.put("openpagelist", al_openpage_info);
				
		session.setAttribute("user", map);	
		
		if(radio.equals("a")){
			return new ModelAndView("resume_write_page");	
		}else{
			return new ModelAndView("commons_layout");
		}
		
	}	
	
		
	@RequestMapping("/imsi_tiles.do")
	public ModelAndView move_tiles() throws Exception{				
		return new ModelAndView("login_layout");
	}
	
	@RequestMapping(value="/login_page.do", method=RequestMethod.GET)
	public ModelAndView login_page() throws Exception{				
		return new ModelAndView("login_layout");
	}
	
	@RequestMapping(value="/login_page.do", method=RequestMethod.POST)
	public ModelAndView login_page(@ModelAttribute("member") MemberDTO command, BindingResult error, ModelMap model, HttpServletRequest request, HttpSession session) throws Exception{		
		int result = 0;		
		String radio = command.getRadio();
		int user_number = 0;
		String user_name = "";
		HashMap map = new HashMap();
		ArrayList al_openpage_info = new ArrayList();

		validator.validate(command, error);
		
		if(radio.equals("a"))
			result = memberDao.check_login_user(command);
		else if(radio.equals("b"))
			result = memberDao.check_login_company(command);
		
		System.out.println("result : " + result);
		System.out.println("error : " + error);
		
		if(result == 0 && error.toString().indexOf('0') != -1){
			System.out.println("1111");		
			command.setCompany_pass("아이디 혹은  비밀번호를 잘못 입력하셨습니다.");
			return new ModelAndView("login_layout", "command", command);
		}
		else{			
			if(result > 0){		
				if(radio.equals("a")){
					//user_id로 넘버를 얻어와야한다.
					MemberDTO imsi_user = memberDao.get_usernumber_id(command.getUser_id()); 
					user_number = imsi_user.getUser_number();
					user_name = imsi_user.getUser_name();
					map.put("user_number", user_number);
					map.put("user_id", command.getUser_id());
					map.put("user_name", user_name);
					map.put("user_type", "user");					
				}else{
					//company_id로 넘버를 얻어와야한다.
					MemberDTO imsi_com = memberDao.get_companynumber_id(command.getCompany_id()); 
					user_number = imsi_com.getUser_number();
					user_name = imsi_com.getCompany_name();
					map.put("user_number", user_number);
					map.put("user_id", command.getCompany_id());
					map.put("user_name", user_name);
					map.put("user_type", "company");
				}
				
				al_openpage_info = memberDao.getOpenpage_info(user_number);				
				map.put("openpagelist", al_openpage_info);						
				session.setAttribute("user", map);
				
				return new ModelAndView("commons_layout");
			}else{
				return new ModelAndView("login_layout", "command", command);
			}			
		}
	}
	
	@RequestMapping("/move_main.do")
	public ModelAndView move_main()throws Exception{		
		return new ModelAndView("commons_layout");
	}	
	
	@RequestMapping("/insert_resume.do")
	public ModelAndView insert_resume(@ModelAttribute("resume")ResumeDTO dto, HttpSession session, HttpServletRequest request)throws Exception{
		HashMap hm = (HashMap)session.getAttribute("user");
		String original_filename = dto.getUploadFile().getOriginalFilename();
			
		
		if(original_filename.length() != 0){	
			String imsi_ext = original_filename.substring(original_filename.indexOf("."));
			
			File dir = new File(request.getRealPath("images/photo"));
			
			if(!dir.exists())
				dir.mkdir();
			// 이 경로에 파일을 집어넣을 것이다.
			File destFile = new File(dir, ((Integer)hm.get("user_number"))+imsi_ext);
			dto.getUploadFile().transferTo(destFile);		
			dto.setResume_photo((Integer)hm.get("user_number")+imsi_ext);
		}else{
			dto.setResume_photo("default_photo.jpg");
		}
		
		
		dto.setUser_number(((Integer)hm.get("user_number")));
		
		String radio = dto.getRadio();
			
		if(radio.equals("a")){
			radio = "남";
		}else if(radio.equals("b")){
			radio = "여";
		}
		
		if(dto.getResume_name_kor().length() == 0){			
			dto.setResume_name_kor("imsi_null");
		}		
		if(dto.getResume_name_eng().length() == 0){			
			dto.setResume_name_eng("imsi_null");
		}		
		if(dto.getResume_name_chc().length() == 0){			
			dto.setResume_name_chc("imsi_null");			
		}		
		if(dto.getResume_salary().length() == 0){			
			dto.setResume_salary("imsi_null");
		}		
		if(dto.getResume_position().length() == 0){			
			dto.setResume_position("imsi_null");
		}		
		if(dto.getResume_address().length() == 0){
			dto.setResume_address("imsi_null");
		}		
		if(dto.getResume_phone().length() == 0){
			dto.setResume_phone("imsi_null");
		}		
		if(dto.getResume_email().length() == 0){
			dto.setResume_email("imsi_null");
		}		
		if(dto.getResume_school1().length() == 0){
			dto.setResume_school1("imsi_null");
		}		
		if(dto.getResume_previous1().length() == 0){
			dto.setResume_previous1("imsi_null");
		}		
		if(dto.getResume_specialty1().length() == 0){
			dto.setResume_specialty1("imsi_null");
		}		
		if(dto.getResume_location1().length() == 0){
			dto.setResume_location1("imsi_null");
		}		
		if(dto.getResume_credit1().length() == 0){
			dto.setResume_credit1("imsi_null");
		}		
		if(dto.getResume_school2().length() == 0){
			dto.setResume_school2("imsi_null");
		}		
		if(dto.getResume_previous2().length() == 0){
			dto.setResume_previous2("imsi_null");
		}		
		if(dto.getResume_specialty2().length() == 0){
			dto.setResume_specialty2("imsi_null");
		}		
		if(dto.getResume_location2().length() == 0){
			dto.setResume_location2("imsi_null");
		}				
		if(dto.getResume_credit2().length() == 0){ 
			dto.setResume_credit2("imsi_null");
		}		
		if(dto.getResume_school3().length() == 0){ 
			dto.setResume_school3("imsi_null");
		}		
		if(dto.getResume_previous3().length() == 0){
			dto.setResume_previous3("imsi_null");
		}		
		if(dto.getResume_specialty3().length() == 0){
			dto.setResume_specialty3("imsi_null");
		}		
		if(dto.getResume_location3().length() == 0){
			dto.setResume_location3("imsi_null");
		}		
		if(dto.getResume_credit3().length() == 0){ 
			dto.setResume_credit3("imsi_null");
		}		
		if(dto.getResume_mili_trench().length() == 0){
			dto.setResume_mili_trench("imsi_null");
		}		
		if(dto.getResume_mili_pre().length() == 0){ 
			dto.setResume_mili_pre("imsi_null");
		}		
		if(dto.getResume_certificate1().length() == 0){
			dto.setResume_certificate1("imsi_null");
		}		
		if(dto.getResume_acquisition1().length() == 0){
			dto.setResume_acquisition1("imsi_null");
		}		
		if(dto.getResume_publish1().length() == 0){ 
			dto.setResume_publish1("imsi_null");
		}		
		if(dto.getResume_certificate2().length() == 0){ 
			dto.setResume_certificate2("imsi_null");
		}		
		if(dto.getResume_acquisition2().length() == 0){ 
			dto.setResume_acquisition2("imsi_null");
		}		
		if(dto.getResume_publish2().length() == 0){ 
			dto.setResume_publish2("imsi_null");
		}		
		if(dto.getResume_certificate3().length() == 0){ 
			dto.setResume_certificate3("imsi_null");
		}		
		if(dto.getResume_acquisition3().length() == 0){
			dto.setResume_acquisition3("imsi_null");
		}		
		if(dto.getResume_publish3().length() == 0){ 
			dto.setResume_publish3("imsi_null");
		}		
		if(dto.getResume_edu1().length() == 0){ 
			dto.setResume_edu1("imsi_null");
		}		
		if(dto.getResume_edu_pre1().length() == 0){ 
			dto.setResume_edu_pre1("imsi_null");
		}		
		if(dto.getResume_edu_ins1().length() == 0){ 
			dto.setResume_edu_ins1("imsi_null");
		}		
		if(dto.getResume_edu_note1().length() == 0){ 
			dto.setResume_edu_note1("imsi_null");
		}		
		if(dto.getResume_edu2().length() == 0){ 
			dto.setResume_edu2("imsi_null");
		}		
		if(dto.getResume_edu_pre2().length() == 0){ 
			dto.setResume_edu_pre2("imsi_null");
		}		
		if(dto.getResume_edu_ins2().length() == 0){ 
			dto.setResume_edu_ins2("imsi_null");
		}		
		if(dto.getResume_edu_note2().length() == 0){ 
			dto.setResume_edu_note2("imsi_null");
		}		
		if(dto.getResume_edu3().length() == 0){ 
			dto.setResume_edu3("imsi_null");
		}		
		if(dto.getResume_edu_pre3().length() == 0){ 
			dto.setResume_edu_pre3("imsi_null");
		}		
		if(dto.getResume_edu_ins3().length() == 0){
			dto.setResume_edu_ins3("imsi_null");
		}		
		if(dto.getResume_edu_note3().length() == 0){
			dto.setResume_edu_note3("imsi_null");
		}		
		if(dto.getResume_care_name1().length() == 0){ 
			dto.setResume_care_name1("imsi_null");
		}		
		if(dto.getResume_care_pre1().length() == 0){ 
			dto.setResume_care_pre1("imsi_null");
		}		
		if(dto.getResume_care_busi1().length() == 0){ 
			dto.setResume_care_busi1("imsi_null");
		}
		if(dto.getResume_care_name2().length() == 0){ 
			dto.setResume_care_name2("imsi_null");
		}
		if(dto.getResume_care_pre2().length() == 0){ 
			dto.setResume_care_pre2("imsi_null");
		}		
		if(dto.getResume_care_busi2().length() == 0){
			dto.setResume_care_busi2("imsi_null");
		}		
		if(dto.getResume_care_name3().length() == 0){ 
			dto.setResume_care_name3("imsi_null");
		}		
		if(dto.getResume_care_pre3().length() == 0){
			dto.setResume_care_pre3("imsi_null");
		}		
		if(dto.getResume_care_busi3().length() == 0){ 
			dto.setResume_care_busi3("imsi_null");
		}		
		if(dto.getResume_sight().length() == 0){
			dto.setResume_sight("imsi_null");
		}		
		if(dto.getResume_blood().length() == 0){ 
			dto.setResume_blood("imsi_null");
		}		
		if(dto.getResume_religion().length() == 0){ 
			dto.setResume_religion("imsi_null");
		}		
		if(dto.getResume_check().length() == 0){
			dto.setResume_check("imsi_null");
		}	
		
		if(dto.getResume_jumin().length() == 0){ 
			dto.setResume_jumin("imsi_null");
		}				
		if(dto.getResume_mili_class().length() == 0){ 
			dto.setResume_mili_class("imsi_null");
		}		
		if(dto.getResume_mili_type().length() == 0){ 
			dto.setResume_mili_type("imsi_null");
		}		
		if(dto.getResume_foreign1().length() == 0){ 
			dto.setResume_foreign1("imsi_null");
		}		
		if(dto.getResume_foreign2().length() == 0){
			dto.setResume_foreign2("imsi_null");
		}		
		if(dto.getResume_foreign3().length() == 0){ 
			dto.setResume_foreign3("imsi_null");
		}		
		if(dto.getResume_ability1().length() == 0){ 
			dto.setResume_ability1("imsi_null");
		}		
		if(dto.getResume_ability2().length() == 0){ 
			dto.setResume_ability2("imsi_null");
		}		
		if(dto.getResume_ability3().length() == 0){ 
			dto.setResume_ability3("imsi_null");
		}		
		if(dto.getResume_care_retirement1().length() == 0){
			dto.setResume_care_retirement1("imsi_null");
		}		
		if(dto.getResume_care_retirement2().length() == 0){ 
			dto.setResume_care_retirement2("imsi_null");
		}		
		if(dto.getResume_care_retirement3().length() == 0){
			dto.setResume_care_retirement3("imsi_null");
		}		
		if(dto.getResume_family().length() == 0){ 
			dto.setResume_family("imsi_null");
		}		
		if(dto.getResume_call().length() == 0){ 
			dto.setResume_call("imsi_null");
		}		
		if(dto.getResume_foreigntest1().length() == 0){ 
			dto.setResume_foreigntest1("imsi_null");
		}		
		if(dto.getResume_foreigresult1().length() == 0){ 
			dto.setResume_foreigresult1("imsi_null");
		}		
		if(dto.getResume_foreigntest2().length() == 0){ 
			dto.setResume_foreigntest2("imsi_null");
		}		
		if(dto.getResume_foreigresult2().length() == 0){ 
			dto.setResume_foreigresult2("imsi_null");			
		}
		if(dto.getResume_foreigntest3().length() == 0){ 
			dto.setResume_foreigntest3("imsi_null");
		}		
		if(dto.getResume_foreigresult3().length() == 0){ 
			dto.setResume_foreigresult3("imsi_null");
		}
		if(dto.getResume_age().length() == 0){ 
			dto.setResume_age("imsi_null");
		}		
		if(dto.getResume_nationality().length() == 0){ 
			dto.setResume_nationality("imsi_null");
		}		
		if(dto.getResume_programingname1().length() == 0){ 
			dto.setResume_programingname1("imsi_null");
		}		
		if(dto.getResume_programingability1().length() == 0){ 
			dto.setResume_programingability1("imsi_null");
		}		
		if(dto.getResume_programingname2().length() == 0){
			dto.setResume_programingname2("imsi_null");
		}
		if(dto.getResume_programingability2().length() == 0){
			dto.setResume_programingability2("imsi_null");
		}
		if(dto.getResume_programingname3().length() == 0){
			dto.setResume_programingname3("imsi_null");
		}
		if(dto.getResume_programingability3().length() == 0){
			dto.setResume_programingability3("imsi_null");
		}
		
				
				
		dto.setRadio(radio);
						
		memberDao.insert_resume(dto);		
		return new ModelAndView("commons_layout");
	}
	
	@RequestMapping("/resume_read_page.do")
	public ModelAndView resume_read_page(HttpServletRequest request)throws Exception{
		
		// 여기서 세션과 관련한 처리가 있어야한다. 아니 그전에 
		// 수정 버튼의 경우 로그인 이후에 보이게 해야하고 
		// 수정버튼을 누를경우 그 녀석의 세션 user_number를 가져와서
		// 이력서 내용을 얻어야할 것이다.
		
		//int imsi_user_number = 115;
		
		int user_number = Integer.parseInt(request.getParameter("user_number"));
		ResumeDTO dto = memberDao.read_resume(user_number);
		
		
		if(dto.getResume_name_kor() .equals("imsi_null")){			
			dto.setResume_name_kor("&nbsp;");
		}		
		if(dto.getResume_name_eng() .equals("imsi_null")){
			dto.setResume_name_eng("&nbsp;");
		}		
		if(dto.getResume_name_chc() .equals("imsi_null")){
			dto.setResume_name_chc("&nbsp;");
		}		
		if(dto.getResume_salary() .equals("imsi_null")){
			dto.setResume_salary("&nbsp;");
		}		
		if(dto.getResume_position() .equals("imsi_null")){
			dto.setResume_position("&nbsp;");
		}		
		if(dto.getResume_address() .equals("imsi_null")){
			dto.setResume_address("&nbsp;");
		}		
		if(dto.getResume_phone() .equals("imsi_null")){
			dto.setResume_phone("&nbsp;");
		}		
		if(dto.getResume_email() .equals("imsi_null")){
			dto.setResume_email("&nbsp;");
		}		
		if(dto.getResume_school1() .equals("imsi_null")){
			dto.setResume_school1("&nbsp;");
		}		
		if(dto.getResume_previous1() .equals("imsi_null")){
			dto.setResume_previous1("&nbsp;");
		}		
		if(dto.getResume_specialty1() .equals("imsi_null")){
			dto.setResume_specialty1("&nbsp;");
		}		
		if(dto.getResume_location1() .equals("imsi_null")){
			dto.setResume_location1("&nbsp;");
		}		
		if(dto.getResume_credit1() .equals("imsi_null")){
			dto.setResume_credit1("&nbsp;");
		}		
		if(dto.getResume_school2() .equals("imsi_null")){
			dto.setResume_school2("&nbsp;");
		}		
		if(dto.getResume_previous2() .equals("imsi_null")){
			dto.setResume_previous2("&nbsp;");
		}		
		if(dto.getResume_specialty2() .equals("imsi_null")){
			dto.setResume_specialty2("&nbsp;");
		}		
		if(dto.getResume_location2() .equals("imsi_null")){
			dto.setResume_location2("&nbsp;");
		}				
		if(dto.getResume_credit2() .equals("imsi_null")){ 
			dto.setResume_credit2("&nbsp;");
		}		
		if(dto.getResume_school3() .equals("imsi_null")){ 
			dto.setResume_school3("&nbsp;");
		}		
		if(dto.getResume_previous3() .equals("imsi_null")){
			dto.setResume_previous3("&nbsp;");
		}		
		if(dto.getResume_specialty3() .equals("imsi_null")){
			dto.setResume_specialty3("&nbsp;");
		}		
		if(dto.getResume_location3() .equals("imsi_null")){
			dto.setResume_location3("&nbsp;");
		}		
		if(dto.getResume_credit3() .equals("imsi_null")){ 
			dto.setResume_credit3("&nbsp;");
		}		
		if(dto.getResume_mili_trench() .equals("imsi_null")){
			dto.setResume_mili_trench("&nbsp;");
		}		
		if(dto.getResume_mili_pre() .equals("imsi_null")){ 
			dto.setResume_mili_pre("&nbsp;");
		}		
		if(dto.getResume_certificate1() .equals("imsi_null")){
			dto.setResume_certificate1("&nbsp;");
		}		
		if(dto.getResume_acquisition1() .equals("imsi_null")){
			dto.setResume_acquisition1("&nbsp;");
		}		
		if(dto.getResume_publish1() .equals("imsi_null")){ 
			dto.setResume_publish1("&nbsp;");
		}		
		if(dto.getResume_certificate2() .equals("imsi_null")){ 
			dto.setResume_certificate2("&nbsp;");
		}		
		if(dto.getResume_acquisition2() .equals("imsi_null")){ 
			dto.setResume_acquisition2("&nbsp;");
		}		
		if(dto.getResume_publish2() .equals("imsi_null")){ 
			dto.setResume_publish2("&nbsp;");
		}		
		if(dto.getResume_certificate3() .equals("imsi_null")){ 
			dto.setResume_certificate3("&nbsp;");
		}		
		if(dto.getResume_acquisition3() .equals("imsi_null")){
			dto.setResume_acquisition3("&nbsp;");
		}		
		if(dto.getResume_publish3() .equals("imsi_null")){ 
			dto.setResume_publish3("&nbsp;");
		}		
		if(dto.getResume_edu1() .equals("imsi_null")){ 
			dto.setResume_edu1("&nbsp;");
		}		
		if(dto.getResume_edu_pre1() .equals("imsi_null")){ 
			dto.setResume_edu_pre1("&nbsp;");
		}		
		if(dto.getResume_edu_ins1() .equals("imsi_null")){ 
			dto.setResume_edu_ins1("&nbsp;");
		}		
		if(dto.getResume_edu_note1() .equals("imsi_null")){ 
			dto.setResume_edu_note1("&nbsp;");
		}		
		if(dto.getResume_edu2() .equals("imsi_null")){ 
			dto.setResume_edu2("&nbsp;");
		}		
		if(dto.getResume_edu_pre2() .equals("imsi_null")){ 
			dto.setResume_edu_pre2("&nbsp;");
		}		
		if(dto.getResume_edu_ins2() .equals("imsi_null")){ 
			dto.setResume_edu_ins2("&nbsp;");
		}		
		if(dto.getResume_edu_note2() .equals("imsi_null")){ 
			dto.setResume_edu_note2("&nbsp;");
		}		
		if(dto.getResume_edu3() .equals("imsi_null")){ 
			dto.setResume_edu3("&nbsp;");
		}		
		if(dto.getResume_edu_pre3() .equals("imsi_null")){ 
			dto.setResume_edu_pre3("&nbsp;");
		}		
		if(dto.getResume_edu_ins3() .equals("imsi_null")){
			dto.setResume_edu_ins3("&nbsp;");
		}		
		if(dto.getResume_edu_note3() .equals("imsi_null")){
			dto.setResume_edu_note3("&nbsp;");
		}		
		if(dto.getResume_care_name1() .equals("imsi_null")){ 
			dto.setResume_care_name1("&nbsp;");
		}		
		if(dto.getResume_care_pre1() .equals("imsi_null")){ 
			dto.setResume_care_pre1("&nbsp;");
		}		
		if(dto.getResume_care_busi1() .equals("imsi_null")){ 
			dto.setResume_care_busi1("&nbsp;");
		}
		if(dto.getResume_care_name2() .equals("imsi_null")){ 
			dto.setResume_care_name2("&nbsp;");
		}
		if(dto.getResume_care_pre2() .equals("imsi_null")){ 
			dto.setResume_care_pre2("&nbsp;");
		}		
		if(dto.getResume_care_busi2() .equals("imsi_null")){
			dto.setResume_care_busi2("&nbsp;");
		}		
		if(dto.getResume_care_name3() .equals("imsi_null")){ 
			dto.setResume_care_name3("&nbsp;");
		}		
		if(dto.getResume_care_pre3() .equals("imsi_null")){
			dto.setResume_care_pre3("&nbsp;");
		}		
		if(dto.getResume_care_busi3() .equals("imsi_null")){ 
			dto.setResume_care_busi3("&nbsp;");
		}		
		if(dto.getResume_sight() .equals("imsi_null")){
			dto.setResume_sight("&nbsp;");
		}		
		if(dto.getResume_blood() .equals("imsi_null")){ 
			dto.setResume_blood("&nbsp;");
		}		
		if(dto.getResume_religion() .equals("imsi_null")){ 
			dto.setResume_religion("&nbsp;");
		}		
		if(dto.getResume_check() .equals("imsi_null")){
			dto.setResume_check("&nbsp;");
		}	
		
		if(dto.getResume_jumin() .equals("imsi_null")){ 
			dto.setResume_jumin("&nbsp;");
		}				
		if(dto.getResume_mili_class() .equals("imsi_null")){ 
			dto.setResume_mili_class("&nbsp;");
		}		
		if(dto.getResume_mili_type() .equals("imsi_null")){ 
			dto.setResume_mili_type("&nbsp;");
		}		
		if(dto.getResume_foreign1() .equals("imsi_null")){ 
			dto.setResume_foreign1("&nbsp;");
		}		
		if(dto.getResume_foreign2() .equals("imsi_null")){
			dto.setResume_foreign2("&nbsp;");
		}		
		if(dto.getResume_foreign3() .equals("imsi_null")){ 
			dto.setResume_foreign3("&nbsp;");
		}		
		if(dto.getResume_ability1() .equals("imsi_null")){ 
			dto.setResume_ability1("&nbsp;");
		}		
		if(dto.getResume_ability2() .equals("imsi_null")){ 
			dto.setResume_ability2("&nbsp;");
		}		
		if(dto.getResume_ability3() .equals("imsi_null")){ 
			dto.setResume_ability3("&nbsp;");
		}		
		if(dto.getResume_care_retirement1() .equals("imsi_null")){
			dto.setResume_care_retirement1("&nbsp;");
		}		
		if(dto.getResume_care_retirement2() .equals("imsi_null")){ 
			dto.setResume_care_retirement2("&nbsp;");
		}		
		if(dto.getResume_care_retirement3() .equals("imsi_null")){
			dto.setResume_care_retirement3("&nbsp;");
		}		
		if(dto.getResume_family() .equals("imsi_null")){ 
			dto.setResume_family("&nbsp;");
		}		
		if(dto.getResume_call() .equals("imsi_null")){ 
			dto.setResume_call("&nbsp;");
		}		
		if(dto.getResume_foreigntest1() .equals("imsi_null")){ 
			dto.setResume_foreigntest1("&nbsp;");
		}		
		if(dto.getResume_foreigresult1() .equals("imsi_null")){ 
			dto.setResume_foreigresult1("&nbsp;");
		}		
		if(dto.getResume_foreigntest2() .equals("imsi_null")){ 
			dto.setResume_foreigntest2("&nbsp;");
		}		
		if(dto.getResume_foreigresult2() .equals("imsi_null")){ 
			dto.setResume_foreigresult2("&nbsp;");			
		}
		if(dto.getResume_foreigntest3() .equals("imsi_null")){ 
			dto.setResume_foreigntest3("&nbsp;");
		}		
		if(dto.getResume_foreigresult3() .equals("imsi_null")){ 
			dto.setResume_foreigresult3("&nbsp;");
		}
		if(dto.getResume_age() .equals("imsi_null")){ 
			dto.setResume_age("&nbsp;");
		}		
		if(dto.getResume_nationality() .equals("imsi_null")){ 
			dto.setResume_nationality("&nbsp;");
		}		
		if(dto.getResume_programingname1() .equals("imsi_null")){ 
			dto.setResume_programingname1("&nbsp;");
		}		
		if(dto.getResume_programingability1() .equals("imsi_null")){ 
			dto.setResume_programingability1("&nbsp;");
		}		
		if(dto.getResume_programingname2() .equals("imsi_null")){
			dto.setResume_programingname2("&nbsp;");
		}
		if(dto.getResume_programingability2() .equals("imsi_null")){
			dto.setResume_programingability2("&nbsp;");
		}
		if(dto.getResume_programingname3() .equals("imsi_null")){
			dto.setResume_programingname3("&nbsp;");
		}
		if(dto.getResume_programingability3() .equals("imsi_null")){
			dto.setResume_programingability3("&nbsp;");
		}
		
		return new ModelAndView("resume_read_page", "resume",  dto);
	}
}
