package member.model;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

public class ResumeDTO {
	private int user_number, resume_number = 0;
	private Date resume_regdate;
	private String radio;
	private String resume_name_kor;
	private String resume_name_eng;
	private String resume_name_chc;
	private	String resume_salary;
	private String resume_position;
	private String resume_address;
	private String resume_phone;
	private String resume_email;
	private String resume_school1;
	private String resume_previous1;
	private String resume_specialty1;
	private String resume_location1;
	private String resume_credit1;
	private String resume_school2;
	private String resume_previous2;
	private String resume_specialty2;
	private String resume_location2;
	private String resume_credit2;
	private String resume_school3;
	private String resume_previous3;
	private String resume_specialty3;
	private String resume_location3;
	private String resume_credit3;
	private String resume_mili_trench;
	private String resume_mili_pre;
	private String resume_certificate1;
	private String resume_acquisition1;
	private String resume_publish1;
	private String resume_certificate2;
	private String resume_acquisition2;
	private String resume_publish2;
	private String resume_certificate3;
	private String resume_acquisition3;
	private String resume_publish3;	
	private String resume_edu1;
	private String resume_edu_pre1;
	private String resume_edu_ins1;
	private String resume_edu_note1;
	private String resume_edu2;
	private String resume_edu_pre2;
	private String resume_edu_ins2;
	private String resume_edu_note2;
	private String resume_edu3;
	private String resume_edu_pre3;
	private String resume_edu_ins3;
	private String resume_edu_note3;
	private String resume_care_name1;
	private String resume_care_pre1;
	private String resume_care_busi1;
	private String resume_care_name2;
	private String resume_care_pre2;
	private String resume_care_busi2;
	private String resume_care_name3;
	private String resume_care_pre3;
	private String resume_care_busi3;
	private String resume_sight;
	private String resume_blood;
	private String resume_religion;
	private String resume_check;
	private String resume_photo;
	private MultipartFile uploadFile;
	private String resume_jumin;
	private String resume_mili_class;
	private String resume_mili_type;
	private String resume_foreign1;
	private String resume_foreign2;
	private String resume_foreign3;
	private String resume_ability1;
	private String resume_ability2;
	private String resume_ability3;
	private String resume_care_retirement1;
	private String resume_care_retirement2;
	private String resume_care_retirement3;
	private String resume_family;
	private String resume_call;
	private String resume_foreigntest1;
	private String resume_foreigresult1;
	private String resume_foreigntest2;
	private String resume_foreigresult2;
	private String resume_foreigntest3;
	private String resume_foreigresult3;
	private String resume_age;
	private String resume_nationality;
	private String resume_programingname1;
	private String resume_programingability1;
	private String resume_programingname2;
	private String resume_programingability2;
	private String resume_programingname3;
	private String resume_programingability3;
	
	public int getUser_number() {
		return user_number;
	}
	public int getResume_number() {
		return resume_number;
	}
	public Date getResume_regdate() {
		return resume_regdate;
	}
	public String getRadio() {
		return radio;
	}
	public String getResume_name_kor() {
		return resume_name_kor;
	}
	public String getResume_name_eng() {
		return resume_name_eng;
	}
	public String getResume_name_chc() {
		return resume_name_chc;
	}
	public String getResume_salary() {
		return resume_salary;
	}
	public String getResume_position() {
		return resume_position;
	}
	public String getResume_address() {
		return resume_address;
	}
	public String getResume_phone() {
		return resume_phone;
	}
	public String getResume_email() {
		return resume_email;
	}
	public String getResume_school1() {
		return resume_school1;
	}
	public String getResume_previous1() {
		return resume_previous1;
	}
	public String getResume_specialty1() {
		return resume_specialty1;
	}
	public String getResume_location1() {
		return resume_location1;
	}
	public String getResume_credit1() {
		return resume_credit1;
	}
	public String getResume_school2() {
		return resume_school2;
	}
	public String getResume_previous2() {
		return resume_previous2;
	}
	public String getResume_specialty2() {
		return resume_specialty2;
	}
	public String getResume_location2() {
		return resume_location2;
	}
	public String getResume_credit2() {
		return resume_credit2;
	}
	public String getResume_school3() {
		return resume_school3;
	}
	public String getResume_previous3() {
		return resume_previous3;
	}
	public String getResume_specialty3() {
		return resume_specialty3;
	}
	public String getResume_location3() {
		return resume_location3;
	}
	public String getResume_credit3() {
		return resume_credit3;
	}
	public String getResume_mili_trench() {
		return resume_mili_trench;
	}
	public String getResume_mili_pre() {
		return resume_mili_pre;
	}
	public String getResume_certificate1() {
		return resume_certificate1;
	}
	public String getResume_acquisition1() {
		return resume_acquisition1;
	}
	public String getResume_publish1() {
		return resume_publish1;
	}
	public String getResume_certificate2() {
		return resume_certificate2;
	}
	public String getResume_acquisition2() {
		return resume_acquisition2;
	}
	public String getResume_publish2() {
		return resume_publish2;
	}
	public String getResume_certificate3() {
		return resume_certificate3;
	}
	public String getResume_acquisition3() {
		return resume_acquisition3;
	}
	public String getResume_publish3() {
		return resume_publish3;
	}
	public String getResume_edu1() {
		return resume_edu1;
	}
	public String getResume_edu_pre1() {
		return resume_edu_pre1;
	}
	public String getResume_edu_ins1() {
		return resume_edu_ins1;
	}
	public String getResume_edu_note1() {
		return resume_edu_note1;
	}
	public String getResume_edu2() {
		return resume_edu2;
	}
	public String getResume_edu_pre2() {
		return resume_edu_pre2;
	}
	public String getResume_edu_ins2() {
		return resume_edu_ins2;
	}
	public String getResume_edu_note2() {
		return resume_edu_note2;
	}
	public String getResume_edu3() {
		return resume_edu3;
	}
	public String getResume_edu_pre3() {
		return resume_edu_pre3;
	}
	public String getResume_edu_ins3() {
		return resume_edu_ins3;
	}
	public String getResume_edu_note3() {
		return resume_edu_note3;
	}
	public String getResume_care_name1() {
		return resume_care_name1;
	}
	public String getResume_care_pre1() {
		return resume_care_pre1;
	}
	public String getResume_care_busi1() {
		return resume_care_busi1;
	}
	public String getResume_care_name2() {
		return resume_care_name2;
	}
	public String getResume_care_pre2() {
		return resume_care_pre2;
	}
	public String getResume_care_busi2() {
		return resume_care_busi2;
	}
	public String getResume_care_name3() {
		return resume_care_name3;
	}
	public String getResume_care_pre3() {
		return resume_care_pre3;
	}
	public String getResume_care_busi3() {
		return resume_care_busi3;
	}
	public String getResume_sight() {
		return resume_sight;
	}
	public String getResume_blood() {
		return resume_blood;
	}
	public String getResume_religion() {
		return resume_religion;
	}
	public String getResume_check() {
		return resume_check;
	}
	public String getResume_photo() {
		return resume_photo;
	}
	public MultipartFile getUploadFile() {
		return uploadFile;
	}
	public String getResume_jumin() {
		return resume_jumin;
	}
	public String getResume_mili_class() {
		return resume_mili_class;
	}
	public String getResume_mili_type() {
		return resume_mili_type;
	}
	public String getResume_foreign1() {
		return resume_foreign1;
	}
	public String getResume_foreign2() {
		return resume_foreign2;
	}
	public String getResume_foreign3() {
		return resume_foreign3;
	}
	public String getResume_ability1() {
		return resume_ability1;
	}
	public String getResume_ability2() {
		return resume_ability2;
	}
	public String getResume_ability3() {
		return resume_ability3;
	}
	public String getResume_care_retirement1() {
		return resume_care_retirement1;
	}
	public String getResume_care_retirement2() {
		return resume_care_retirement2;
	}
	public String getResume_care_retirement3() {
		return resume_care_retirement3;
	}
	public String getResume_family() {
		return resume_family;
	}
	public String getResume_call() {
		return resume_call;
	}
	public String getResume_foreigntest1() {
		return resume_foreigntest1;
	}
	public String getResume_foreigresult1() {
		return resume_foreigresult1;
	}
	public String getResume_foreigntest2() {
		return resume_foreigntest2;
	}
	public String getResume_foreigresult2() {
		return resume_foreigresult2;
	}
	public String getResume_foreigntest3() {
		return resume_foreigntest3;
	}
	public String getResume_foreigresult3() {
		return resume_foreigresult3;
	}
	public String getResume_age() {
		return resume_age;
	}
	public String getResume_nationality() {
		return resume_nationality;
	}
	public String getResume_programingname1() {
		return resume_programingname1;
	}
	public String getResume_programingability1() {
		return resume_programingability1;
	}
	public String getResume_programingname2() {
		return resume_programingname2;
	}
	public String getResume_programingability2() {
		return resume_programingability2;
	}
	public String getResume_programingname3() {
		return resume_programingname3;
	}
	public String getResume_programingability3() {
		return resume_programingability3;
	}
	
	//=================================================
	
	
	public void setUser_number(int user_number) {
		this.user_number = user_number;
	}
	public void setResume_number(int resume_number) {
		this.resume_number = resume_number;
	}
	public void setResume_regdate(Date resume_regdate) {
		this.resume_regdate = resume_regdate;
	}
	public void setRadio(String radio) {
		this.radio = radio;
	}
	public void setResume_name_kor(String resume_name_kor) {
		this.resume_name_kor = resume_name_kor;
	}
	public void setResume_name_eng(String resume_name_eng) {
		this.resume_name_eng = resume_name_eng;
	}
	public void setResume_name_chc(String resume_name_chc) {
		this.resume_name_chc = resume_name_chc;
	}
	public void setResume_salary(String resume_salary) {
		this.resume_salary = resume_salary;
	}
	public void setResume_position(String resume_position) {
		this.resume_position = resume_position;
	}
	public void setResume_address(String resume_address) {
		this.resume_address = resume_address;
	}
	public void setResume_phone(String resume_phone) {
		this.resume_phone = resume_phone;
	}
	public void setResume_email(String resume_email) {
		this.resume_email = resume_email;
	}
	public void setResume_school1(String resume_school1) {
		this.resume_school1 = resume_school1;
	}
	public void setResume_previous1(String resume_previous1) {
		this.resume_previous1 = resume_previous1;
	}
	public void setResume_specialty1(String resume_specialty1) {
		this.resume_specialty1 = resume_specialty1;
	}
	public void setResume_location1(String resume_location1) {
		this.resume_location1 = resume_location1;
	}
	public void setResume_credit1(String resume_credit1) {
		this.resume_credit1 = resume_credit1;
	}
	public void setResume_school2(String resume_school2) {
		this.resume_school2 = resume_school2;
	}
	public void setResume_previous2(String resume_previous2) {
		this.resume_previous2 = resume_previous2;
	}
	public void setResume_specialty2(String resume_specialty2) {
		this.resume_specialty2 = resume_specialty2;
	}
	public void setResume_location2(String resume_location2) {
		this.resume_location2 = resume_location2;
	}
	public void setResume_credit2(String resume_credit2) {
		this.resume_credit2 = resume_credit2;
	}
	public void setResume_school3(String resume_school3) {
		this.resume_school3 = resume_school3;
	}
	public void setResume_previous3(String resume_previous3) {
		this.resume_previous3 = resume_previous3;
	}
	public void setResume_specialty3(String resume_specialty3) {
		this.resume_specialty3 = resume_specialty3;
	}
	public void setResume_location3(String resume_location3) {
		this.resume_location3 = resume_location3;
	}
	public void setResume_credit3(String resume_credit3) {
		this.resume_credit3 = resume_credit3;
	}
	public void setResume_mili_trench(String resume_mili_trench) {
		this.resume_mili_trench = resume_mili_trench;
	}
	public void setResume_mili_pre(String resume_mili_pre) {
		this.resume_mili_pre = resume_mili_pre;
	}
	public void setResume_certificate1(String resume_certificate1) {
		this.resume_certificate1 = resume_certificate1;
	}
	public void setResume_acquisition1(String resume_acquisition1) {
		this.resume_acquisition1 = resume_acquisition1;
	}
	public void setResume_publish1(String resume_publish1) {
		this.resume_publish1 = resume_publish1;
	}
	public void setResume_certificate2(String resume_certificate2) {
		this.resume_certificate2 = resume_certificate2;
	}
	public void setResume_acquisition2(String resume_acquisition2) {
		this.resume_acquisition2 = resume_acquisition2;
	}
	public void setResume_publish2(String resume_publish2) {
		this.resume_publish2 = resume_publish2;
	}
	public void setResume_certificate3(String resume_certificate3) {
		this.resume_certificate3 = resume_certificate3;
	}
	public void setResume_acquisition3(String resume_acquisition3) {
		this.resume_acquisition3 = resume_acquisition3;
	}
	public void setResume_publish3(String resume_publish3) {
		this.resume_publish3 = resume_publish3;
	}
	public void setResume_edu1(String resume_edu1) {
		this.resume_edu1 = resume_edu1;
	}
	public void setResume_edu_pre1(String resume_edu_pre1) {
		this.resume_edu_pre1 = resume_edu_pre1;
	}
	public void setResume_edu_ins1(String resume_edu_ins1) {
		this.resume_edu_ins1 = resume_edu_ins1;
	}
	public void setResume_edu_note1(String resume_edu_note1) {
		this.resume_edu_note1 = resume_edu_note1;
	}
	public void setResume_edu2(String resume_edu2) {
		this.resume_edu2 = resume_edu2;
	}
	public void setResume_edu_pre2(String resume_edu_pre2) {
		this.resume_edu_pre2 = resume_edu_pre2;
	}
	public void setResume_edu_ins2(String resume_edu_ins2) {
		this.resume_edu_ins2 = resume_edu_ins2;
	}
	public void setResume_edu_note2(String resume_edu_note2) {
		this.resume_edu_note2 = resume_edu_note2;
	}
	public void setResume_edu3(String resume_edu3) {
		this.resume_edu3 = resume_edu3;
	}
	public void setResume_edu_pre3(String resume_edu_pre3) {
		this.resume_edu_pre3 = resume_edu_pre3;
	}
	public void setResume_edu_ins3(String resume_edu_ins3) {
		this.resume_edu_ins3 = resume_edu_ins3;
	}
	public void setResume_edu_note3(String resume_edu_note3) {
		this.resume_edu_note3 = resume_edu_note3;
	}
	public void setResume_care_name1(String resume_care_name1) {
		this.resume_care_name1 = resume_care_name1;
	}
	public void setResume_care_pre1(String resume_care_pre1) {
		this.resume_care_pre1 = resume_care_pre1;
	}
	public void setResume_care_busi1(String resume_care_busi1) {
		this.resume_care_busi1 = resume_care_busi1;
	}
	public void setResume_care_name2(String resume_care_name2) {
		this.resume_care_name2 = resume_care_name2;
	}
	public void setResume_care_pre2(String resume_care_pre2) {
		this.resume_care_pre2 = resume_care_pre2;
	}
	public void setResume_care_busi2(String resume_care_busi2) {
		this.resume_care_busi2 = resume_care_busi2;
	}
	public void setResume_care_name3(String resume_care_name3) {
		this.resume_care_name3 = resume_care_name3;
	}
	public void setResume_care_pre3(String resume_care_pre3) {
		this.resume_care_pre3 = resume_care_pre3;
	}
	public void setResume_care_busi3(String resume_care_busi3) {
		this.resume_care_busi3 = resume_care_busi3;
	}
	public void setResume_sight(String resume_sight) {
		this.resume_sight = resume_sight;
	}
	public void setResume_blood(String resume_blood) {
		this.resume_blood = resume_blood;
	}
	public void setResume_religion(String resume_religion) {
		this.resume_religion = resume_religion;
	}
	public void setResume_check(String resume_check) {
		this.resume_check = resume_check;
	}
	public void setResume_photo(String resume_photo) {
		this.resume_photo = resume_photo;
	}
	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}
	public void setResume_jumin(String resume_jumin) {
		this.resume_jumin = resume_jumin;
	}
	public void setResume_mili_class(String resume_mili_class) {
		this.resume_mili_class = resume_mili_class;
	}
	public void setResume_mili_type(String resume_mili_type) {
		this.resume_mili_type = resume_mili_type;
	}
	public void setResume_foreign1(String resume_foreign1) {
		this.resume_foreign1 = resume_foreign1;
	}
	public void setResume_foreign2(String resume_foreign2) {
		this.resume_foreign2 = resume_foreign2;
	}
	public void setResume_foreign3(String resume_foreign3) {
		this.resume_foreign3 = resume_foreign3;
	}
	public void setResume_ability1(String resume_ability1) {
		this.resume_ability1 = resume_ability1;
	}
	public void setResume_ability2(String resume_ability2) {
		this.resume_ability2 = resume_ability2;
	}
	public void setResume_ability3(String resume_ability3) {
		this.resume_ability3 = resume_ability3;
	}
	public void setResume_care_retirement1(String resume_care_retirement1) {
		this.resume_care_retirement1 = resume_care_retirement1;
	}
	public void setResume_care_retirement2(String resume_care_retirement2) {
		this.resume_care_retirement2 = resume_care_retirement2;
	}
	public void setResume_care_retirement3(String resume_care_retirement3) {
		this.resume_care_retirement3 = resume_care_retirement3;
	}
	public void setResume_family(String resume_family) {
		this.resume_family = resume_family;
	}
	public void setResume_call(String resume_call) {
		this.resume_call = resume_call;
	}
	public void setResume_foreigntest1(String resume_foreigntest1) {
		this.resume_foreigntest1 = resume_foreigntest1;
	}
	public void setResume_foreigresult1(String resume_foreigresult1) {
		this.resume_foreigresult1 = resume_foreigresult1;
	}
	public void setResume_foreigntest2(String resume_foreigntest2) {
		this.resume_foreigntest2 = resume_foreigntest2;
	}
	public void setResume_foreigresult2(String resume_foreigresult2) {
		this.resume_foreigresult2 = resume_foreigresult2;
	}
	public void setResume_foreigntest3(String resume_foreigntest3) {
		this.resume_foreigntest3 = resume_foreigntest3;
	}
	public void setResume_foreigresult3(String resume_foreigresult3) {
		this.resume_foreigresult3 = resume_foreigresult3;
	}
	public void setResume_age(String resume_age) {
		this.resume_age = resume_age;
	}
	public void setResume_nationality(String resume_nationality) {
		this.resume_nationality = resume_nationality;
	}
	public void setResume_programingname1(String resume_programingname1) {
		this.resume_programingname1 = resume_programingname1;
	}
	public void setResume_programingability1(String resume_programingability1) {
		this.resume_programingability1 = resume_programingability1;
	}
	public void setResume_programingname2(String resume_programingname2) {
		this.resume_programingname2 = resume_programingname2;
	}
	public void setResume_programingability2(String resume_programingability2) {
		this.resume_programingability2 = resume_programingability2;
	}
	public void setResume_programingname3(String resume_programingname3) {
		this.resume_programingname3 = resume_programingname3;
	}
	public void setResume_programingability3(String resume_programingability3) {
		this.resume_programingability3 = resume_programingability3;
	}
	
	
	
	
}
