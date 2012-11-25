package openmatching.model;

import java.util.ArrayList;

public class ResultDTO {
	private ArrayList<ApplierDTO> array;
	private String applier_position_each;
	private String matching_number;
	
	
	public String getMatching_number() {
		return matching_number;
	}
	public void setMatching_number(String matching_number) {
		this.matching_number = matching_number;
	}
	public ArrayList<ApplierDTO> getArray() {
		return array;
	}
	public void setArray(ArrayList<ApplierDTO> array) {
		this.array = array;
	}
	public String getApplier_position_each() {
		return applier_position_each;
	}
	public void setApplier_position_each(String applier_position_each) {
		this.applier_position_each = applier_position_each;
	}
		
		
}
