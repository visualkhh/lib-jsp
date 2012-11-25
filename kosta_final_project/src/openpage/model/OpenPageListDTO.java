package openpage.model;

import java.io.Serializable;

public class OpenPageListDTO implements Serializable{
private int openpage_number,user_number;
private String openpage_url,openpage_type,openpage_memberlist,openpage_description,openpage_name,setting_theme;
public int getOpenpage_number() {
	return openpage_number;
}
public void setOpenpage_number(int openpage_number) {
	this.openpage_number = openpage_number;
}
public int getUser_number() {
	return user_number;
}
public void setUser_number(int user_number) {
	this.user_number = user_number;
}
public String getOpenpage_url() {
	return openpage_url;
}
public void setOpenpage_url(String openpage_url) {
	this.openpage_url = openpage_url;
}
public String getOpenpage_type() {
	return openpage_type;
}
public void setOpenpage_type(String openpage_type) {
	this.openpage_type = openpage_type;
}
public String getOpenpage_memberlist() {
	return openpage_memberlist;
}
public void setOpenpage_memberlist(String openpage_memberlist) {
	this.openpage_memberlist = openpage_memberlist;
}
public String getOpenpage_description() {
	return openpage_description;
}
public void setOpenpage_description(String openpage_description) {
	this.openpage_description = openpage_description;
}
public String getOpenpage_name() {
	return openpage_name;
}
public void setOpenpage_name(String openpage_name) {
	this.openpage_name = openpage_name;
}
public String getSetting_theme() {
	return setting_theme;
}
public void setSetting_theme(String setting_theme) {
	this.setting_theme = setting_theme;
}
}
