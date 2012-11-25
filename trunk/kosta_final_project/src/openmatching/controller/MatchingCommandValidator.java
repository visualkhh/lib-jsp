package openmatching.controller;

import member.model.MemberDTO;
import openmatching.model.MatchingDTO;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class MatchingCommandValidator implements Validator {

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
		MatchingDTO command = (MatchingDTO)obj;	
		
		System.out.println("¸ð³Ä");
				
		if(command.getMatching_title() == null || command.getMatching_title().length() == 0){			
			arg1.rejectValue("matching_title", "required");
		}
		if(command.getMatching_writer() == null || command.getMatching_writer().length() == 0){			
			arg1.rejectValue("matching_writer", "required");
		}
		if(command.getMatching_info() == null || command.getMatching_info().length() == 0){			
			arg1.rejectValue("matching_info", "required");
		}
	}
}
