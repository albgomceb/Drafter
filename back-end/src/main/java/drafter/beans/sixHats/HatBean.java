package drafter.beans.sixHats;

import java.util.Collection;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.SafeHtml.List;

import drafter.beans.hatConclusion.HatConclusionBean;

public class HatBean {

	private int id;
	private int version;
	private String color;
	private int order;
	private @List(@SafeHtml) Collection<HatConclusionBean> hatConclusions;
	
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
	public @List(@SafeHtml) Collection<HatConclusionBean> getHatConclusions() {
		return hatConclusions;
	}
	public void setHatConclusions(@List(@SafeHtml) Collection<HatConclusionBean> collection) {
		this.hatConclusions = collection;
	}

	
}
