package kosta.spring;

public class OracleDao implements Dao {
	@Override
	public void insert() {
		System.out.println("ORACLE DAO~!!INSERT");
	}

}
