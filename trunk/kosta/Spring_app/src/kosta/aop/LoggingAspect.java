package kosta.aop;

import org.aspectj.lang.ProceedingJoinPoint;

public class LoggingAspect {
	public Object logging(ProceedingJoinPoint joinpoint) throws Throwable{
		try {
			joinpoint.proceed(); //�����Ͻ� write�޼ҵ� ȣ�����
		} catch (Throwable e) {
		}finally{
		}
		return null;
	}
}
