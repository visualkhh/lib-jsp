package member.controller;

import member.model.MemberDTO;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class MemberCommandValidator implements Validator {

	@Override
	public boolean supports(Class arg0) {
		// TODO Auto-generated method stub
		if(MemberDTO.class.isAssignableFrom(arg0)){
			return true;
		}
		return false;
	}

	@Override
	public void validate(Object obj, Errors arg1) {
		// TODO Auto-generated method stub
		MemberDTO command = (MemberDTO)obj;
		
		if(command.getRadio().equals("a")){		
			if(command.getUser_id() == null || command.getUser_id().length() == 0){			
				arg1.rejectValue("user_id", "required");
			}
			if(command.getUser_pass() == null || command.getUser_pass().length() == 0){			
				arg1.rejectValue("user_pass", "required");
			}		
		}else if(command.getRadio().equals("b")){
			if(command.getCompany_id() == null || command.getCompany_id().length() == 0){			
				arg1.rejectValue("user_id", "required");
			}
			if(command.getCompany_pass() == null || command.getCompany_pass().length() == 0){			
				arg1.rejectValue("user_pass", "required");
			}
		}
	}
}
