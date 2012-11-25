package openpage.model;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
public class OpenPageListValidate implements Validator {
      
		@Override
       public boolean supports(Class arg0){
             if(OpenPageListDTO.class.isAssignableFrom(arg0))
                    return true;
             return false;
       }
		
        @Override
       public void validate(Object arg0, Errors arg1) {
        	OpenPageListDTO command = (OpenPageListDTO)arg0;
             if(command.getOpenpage_description()==null || command.getOpenpage_description().length()==0){
                    arg1.rejectValue("openpage_description", "required");
             }
             if(command.getOpenpage_name()==null || command.getOpenpage_name().length()==0){
                    arg1.rejectValue("openpage_name", "required");
             }

             if(command.getOpenpage_url()==null || command.getOpenpage_url().length()==0){
                 arg1.rejectValue("openpage_url", "required");
          }

             if(command.getUser_number()<0){
                 arg1.rejectValue("user_number", "required");
          }
      
 
       }
 
}
 
