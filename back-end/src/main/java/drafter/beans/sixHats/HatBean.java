package drafter.beans.sixHats;

import java.util.Collection;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.SafeHtml.List;

import drafter.beans.sixHatsConclusion.HatConclusionBean;

public class HatBean {

	private int id;
	private int version;
	private String color;
	private int order;
	private @List(@SafeHtml) Collection<HatConclusionBean> conclusions;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public int getOrder() {
		return order;
	}
	public void setOrder(int order) {
		this.order = order;
	}
	public @List(@SafeHtml) Collection<HatConclusionBean> getConclusions() {
		return conclusions;
	}
	public void setConclusions(@List(@SafeHtml) Collection<HatConclusionBean> collection) {
		this.conclusions = collection;
	}

	
}
