package khh.web.jsp.framework.commet.longpolling.task;

import khh.web.jsp.framework.commet.longpolling.Gun;

public class GunTask extends Thread {
	Gun gun = null;
	public GunTask() {
	}
	public GunTask(Gun gun){
		this.gun = gun;
	}
	public Gun getGun() {
		return gun;
	}
	public void setGun(Gun gun) {
		this.gun = gun;
	}
	@Override
	public void run() {
		try{
			sleep(1);
			if(getGun()!=null){
				//getGun().action();
			}
		}catch (InterruptedException e) {
		}
	}
}
