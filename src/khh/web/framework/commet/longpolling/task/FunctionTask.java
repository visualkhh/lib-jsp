package khh.web.framework.commet.longpolling.task;

import khh.web.framework.commet.longpolling.Function;

public class FunctionTask extends Thread {

	Function function = null;

	public FunctionTask(){
		
	}
	public FunctionTask(Function function){
		this.function=function;
	}
	
	public Function getFunction() {
		return function;
	}
	public void setFunction(Function function) {
		this.function = function;
	}
	@Override
	public void run() {
		try{
			sleep(1);
			if(getFunction()!=null){
			//	getFunction().action();
			}
		}catch (InterruptedException e) {
		}
	}
}