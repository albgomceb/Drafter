package drafter.beans.sixHats;

import java.util.Collection;

public class HatBean {

	private int id;
	private String color;
	private int order;
	private Collection<String> conclussions;
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
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
	public Collection<String> getConclussions() {
		return conclussions;
	}
	public void setConclussions(Collection<String> conclussions) {
		this.conclussions = conclussions;
	}

	
}
