package openmatching.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;
import myclasses.*;

public class DownloadController implements Controller, ApplicationContextAware {
	private WebApplicationContext context = null;
//	private String uploadDir;
//	
//	public void setUploadDir(String uploadDir) {
//		this.uploadDir = uploadDir;
//	}
	@Override
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse arg1) throws Exception {
		// TODO Auto-generated method stub
		
		File downloadFile = getFile(request);
		
		return new ModelAndView("download", "downloadFile", downloadFile);	
		//xml 파일과 비교하면서 봐야할듯
		
	}

	private File getFile(HttpServletRequest request){
		String filename = request.getParameter("filename");
		
		filename = StringUtil.toHangul(filename);
		
		String path = context.getServletContext().getRealPath("uploadFiles");
		return new File(path+"/"+filename);
	}
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		// TODO Auto-generated method stub
		this.context = (WebApplicationContext)applicationContext;

	}

}
