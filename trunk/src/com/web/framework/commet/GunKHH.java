package com.web.framework.commet;

import com.web.framework.commet.longpolling.Gun;

public class GunKHH extends Gun {
	int i=0;
	@Override
	public Object trigger() throws Exception {
		Object o = null;
		while(true){
			try {
				Thread.sleep(getInterval());
				o="khh"+i+"       cometsize "+getCometEventList().size();
				i++;
				break;
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		return o;
	}
}
