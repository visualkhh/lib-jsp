package openmatching.model;


import org.springframework.web.multipart.MultipartFile;

public class MatchingDTO {
	private int matching_number;
	private String matching_type;		//팀인지 기업인지.
	private String matching_title;		//프로젝트 제목
	private String matching_writer;		//프로젝트 작성자
	private String matching_regdate;	//작성일
	private String matching_complete;	//진행중/ 종료를 나타냄.
	private String matching_info;		//프로젝트 내용
	private String matching_filename1;	//첨부파일 1 ==>db에 들어갈것.
	private String matching_filename2;	//첨부파일 2 ==>db에 들어갈것.
	private MultipartFile uploadFile1;	//첨부파일 1 ==>폼으로 넘길때
	private MultipartFile uploadFile2;	//첨부파일 2 ==>폼으로 넘길때
	private String matching_writerid;	//작성자 id	
	private String matching_total;		//모으는 인원 총수	
	private String job_position;
	private String job_count;
	private String job_number;
	private String job_value;
	private String applier_type;	
	
	private String [] a;
	private String [] b;
	private String [] c;	
	
	public String getApplier_type() {
		return applier_type;
	}
	public void setApplier_type(String applier_type) {
		this.applier_type = applier_type;
	}
	public String getJob_value() {
		return job_value;
	}
	public void setJob_value(String job_value) {
		this.job_value = job_value;
	}
	public String[] getC() {
		return c;
	}
	public void setC(String[] c) {
		this.c = c;
	}
	public String[] getA() {
		return a;
	}
	public void setA(String[] a) {
		this.a = a;
	}
	public String[] getB() {
		return b;
	}
	public void setB(String[] b) {
		this.b = b;
	}
	public int getMatching_number() {
		return matching_number;
	}
	public void setMatching_number(int matching_number) {
		this.matching_number = matching_number;
	}
	public String getJob_position() {
		return job_position;
	}
	public void setJob_position(String job_position) {
		this.job_position = job_position;
	}
	public String getJob_count() {
		return job_count;
	}
	public void setJob_count(String job_count) {
		this.job_count = job_count;
	}
	public String getJob_number() {
		return job_number;
	}
	public void setJob_number(String job_number) {
		this.job_number = job_number;
	}
	public String getMatching_type() {
		return matching_type;
	}
	public void setMatching_type(String matching_type) {
		this.matching_type = matching_type;
	}
	public String getMatching_title() {
		return matching_title;
	}
	public void setMatching_title(String matching_title) {
		this.matching_title = matching_title;
	}
	public String getMatching_writer() {
		return matching_writer;
	}
	public void setMatching_writer(String matching_writer) {
		this.matching_writer = matching_writer;
	}
	public String getMatching_regdate() {
		return matching_regdate;
	}
	public void setMatching_regdate(String matching_regdate) {
		this.matching_regdate = matching_regdate;
	}
	public String getMatching_complete() {
		return matching_complete;
	}
	public void setMatching_complete(String matching_complete) {
		this.matching_complete = matching_complete;
	}
	public String getMatching_info() {
		return matching_info;
	}
	public void setMatching_info(String matching_info) {
		this.matching_info = matching_info;
	}
	public String getMatching_filename1() {
		return matching_filename1;
	}
	public void setMatching_filename1(String matching_filename1) {
		this.matching_filename1 = matching_filename1;
	}
	public String getMatching_filename2() {
		return matching_filename2;
	}
	public void setMatching_filename2(String matching_filename2) {
		this.matching_filename2 = matching_filename2;
	}
	public MultipartFile getUploadFile1() {
		return uploadFile1;
	}
	public void setUploadFile1(MultipartFile uploadFile1) {
		this.uploadFile1 = uploadFile1;
	}
	public MultipartFile getUploadFile2() {
		return uploadFile2;
	}
	public void setUploadFile2(MultipartFile uploadFile2) {
		this.uploadFile2 = uploadFile2;
	}
	public String getMatching_writerid() {
		return matching_writerid;
	}
	public void setMatching_writerid(String matching_writerid) {
		this.matching_writerid = matching_writerid;
	}
	public String getMatching_total() {
		return matching_total;
	}
	public void setMatching_total(String matching_total) {
		this.matching_total = matching_total;
	}
	
}
