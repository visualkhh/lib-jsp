package kosta.aop;

import org.aspectj.lang.ProceedingJoinPoint;

public class LoggingAspect {
	public Object logging(ProceedingJoinPoint joinpoint) throws Throwable{
		try {
			joinpoint.proceed(); //비지니스 write메소드 호출시점
		} catch (Throwable e) {
		}finally{
		}
		return null;
	}
}
