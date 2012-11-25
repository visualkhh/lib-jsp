package openmatching.model;


import java.util.List;

public class PageDTO {
	private List<MatchingDTO> array;
	private int first;
	private int last;
	private int prev;
	private int next;
	private int begin;
	private int end;
	private String search;
	private String key;
	private String cur_page;
	private String s_type;
	
	
	public String getS_type() {
		return s_type;
	}
	public void setS_type(String s_type) {
		this.s_type = s_type;
	}
	public List<MatchingDTO> getArray() {
		return array;
	}
	public void setArray(List<MatchingDTO> array) {
		this.array = array;
	}
	public int getFirst() {
		return first;
	}
	public void setFirst(int first) {
		this.first = first;
	}
	public int getLast() {
		return last;
	}
	public void setLast(int last) {
		this.last = last;
	}
	public int getPrev() {
		return prev;
	}
	public void setPrev(int prev) {
		this.prev = prev;
	}
	public int getNext() {
		return next;
	}
	public void setNext(int next) {
		this.next = next;
	}
	public int getBegin() {
		return begin;
	}
	public void setBegin(int begin) {
		this.begin = begin;
	}
	public int getEnd() {
		return end;
	}
	public void setEnd(int end) {
		this.end = end;
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getCur_page() {
		return cur_page;
	}
	public void setCur_page(String cur_page) {
		this.cur_page = cur_page;
	}
}
