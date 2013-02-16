package kosta.spring;

public class WriteServiceImpl  implements WriteService{
	private Dao dao;
	private Dao dao2;
	private String name;
	public WriteServiceImpl(Dao dao){
		this.dao = dao;
	}
	public void setDao2(Dao dao2) {
		this.dao2 = dao2;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public void write() {
		System.out.println("WriteServiceWrite "+name);
		dao.insert();
	}
}
