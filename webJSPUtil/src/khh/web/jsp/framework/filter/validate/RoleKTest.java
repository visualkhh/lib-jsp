package khh.web.jsp.framework.filter.validate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import khh.debug.LogK;
import khh.string.util.StringUtil;
import khh.xml.Element;
import khh.xml.XMLK;

public class RoleKTest {
	static LogK log = LogK.getInstance();
	//ArrayList<Element> tList = null;
	Map<String, Element> targetElement = null;
	public void start() throws Exception{
		
		XMLK xml = new XMLK("Z:\\me\\project\\personal\\web\\logger\\workspace\\logerss\\WebContent\\WEB-INF\\config\\rolek_config.xml");
		xml.setTargetXPath("/roles/role");
		
		xml.setLogicExtendsAddChild((Element parent, Element child)->{
			//우선 자기걸로 부모꺼 머지든 가져오자.  type이 new가 아닌건 모두다 merge다..  url속성있어야한다.
//			((ArrayList<Element>)child.getChildElementByTagName("join")).stream().filter(cJE->"new".equals(cJE.getAttr("type"))).forEach(cJE->{
			((ArrayList<Element>)child.getChildElementByTagName("join")).stream().filter(cJE->!"new".equals(cJE.getAttr("type"))&&cJE.isAttr("url")).forEach(cJE->{
				LinkedHashMap<String,Element> fncMap = new LinkedHashMap<String,Element> ();
				String url = cJE.getAttr("url");
				((ArrayList<Element>)parent.getChildElementByTagName("join")).//무조꺼에서 join중 나랑같은url가진 join의 fnc를 가져온다
				stream().filter(pJE->url.equals(pJE.getAttr("url"))).collect(Collectors.toList()).forEach(pJE->{
					fncMap.putAll( ((ArrayList<Element>)pJE.getChildElementByTagName("fnc")).stream().collect(Collectors.toMap(pJFE->((Element)pJFE).getAttr("name"),pJFE->pJFE)) );
				});
				//마지막 자식것이 중요하기때문에 자식걸 마지막 덛칠하다
				fncMap.putAll( ((ArrayList<Element>)cJE.getChildElementByTagName("fnc")).stream().collect(Collectors.toMap(cJFE->((Element)cJFE).getAttr("name"),cJFE->cJFE)) );
				//마지막 셋팅
				cJE.setChildElement(fncMap.entrySet().stream().map(at->at.getValue()).collect(Collectors.toCollection(ArrayList::new)));
				
			});
			//부모join이름이  자식과 겹치지 않는놈들만 아래 내려간다. 즉 자식이 재정의 한거 아닌것만 내려간다.
			child.addAllChildElement(
				((ArrayList<Element>)parent.getChildElementByTagName("join")).stream().
				filter(pJE->child.getChildElementByAttr("url",pJE.getAttr("url")).size()<=0).collect(Collectors.toCollection(ArrayList::new))
             );
		});
		
		xml.start();
		
		xml.loopNode(xml.getTargetElements(),(Element e,Integer depth)->{
			log.debug(StringUtil.loopString("\t",depth)+e);
		});
		
		targetElement = ((ArrayList<Element>)xml.getTargetElements()).stream().collect(Collectors.toMap(i->((Element)i).getAttr("id"),i->i));
		
		final String roleName="guest";
//		if(roleName==null){
//			targetElement.
//		}
		
		//url petton, fncName, value
		LinkedHashMap<String, LinkedHashMap<String, String>> totalRoleList = new LinkedHashMap<>();
		//사용자 셋팅
		targetElement.entrySet().stream().filter(at->roleName.equals(at.getKey())).map(at->at.getValue()).collect(Collectors.toList()).stream().forEach(at->{
			((ArrayList<Element>)at.getChildElementByTagName("join")).stream().forEach(aj->{
				String url = aj.getAttr("url");
				LinkedHashMap<String, String> join = new LinkedHashMap<String, String>();
				((ArrayList<Element>)aj.getChildElementByTagName("fnc")).stream().forEach(ajf->{
					join.put(ajf.getAttr("name"), ajf.getAttr("value"));
				});
				//if(join.size()>0)
				totalRoleList.put(url, join);
			});
		});
		
		
		totalRoleList.entrySet().stream().forEach(at->System.out.println(at));
		//totalRoleList
		
		
//		targetElement.entrySet().stream().forEach(aE->{
//			Element e = aE.getValue();
//			log.debug(e);
//		});
//		
		
		
		
		
//		LinkedHashMap<String, LinkedHashMap<String, LinkedHashMap<String, String>>> roleList = new LinkedHashMap<>();
//		targetElement.entrySet().stream().forEach(eE->{ //loopRole
//			Element atE = eE.getValue();
//			LinkedHashMap<String, LinkedHashMap<String, String>> getList = loopRole(atE);
//			roleList.put(atE.getAttr("id"), loopRole(atE));
//			
//		});
		
		
		
		
	}
//	private LinkedHashMap<String, LinkedHashMap<String, String>> loopRole(Element etRole) {//loopRole -> join
//		//if extends
//		LinkedHashMap<String, LinkedHashMap<String, String>> joinList = new LinkedHashMap<>();
//		
////		LinkedHashMap<String, String> fncList = new LinkedHashMap<>();
////		Element targetRole = null;
//		if(etRole.isAttr("extends")&&null!=targetElement.get(etRole.getAttr("extends"))){ //extends
//			Element targetRole = targetElement.get(etRole.getAttr("extends"));
//			((ArrayList<Element>)etRole.getChildElementByTagName("join")).stream().forEach(jE->{
//				
//			});
//			
//		}else{
//			((ArrayList<Element>)etRole.getChildElementByTagName("join")).stream().forEach(jE->{
//				LinkedHashMap<String, String> fncList = new LinkedHashMap<String, String>();
//				String jUrl = jE.getAttr("url");
//				((ArrayList<Element>)jE.getChildElementByTagName("fnc")).stream().forEach(fE->{
//					fncList.put(fE.getAttr("name"),fE.getAttr("value"));
//				});
//				joinList.put(jUrl, fncList);
//			});
//			//joinList.put
//		}
//		//el.getChildElementByTagName("join")
//		//....
//		//joinList.put(el.getAttr("url"), loopFnc());
//		return joinList;
//	}

	
	
	public static void main(String[] args) throws Exception {
		RoleKTest r = new RoleKTest();
		r.start();
	}
}
