package drafter.beans.sixHats;

import java.util.ArrayList;
import java.util.Collection;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.SafeHtml.List;

public class HatBean {

	private int id;
	private String color;
	private int order;
	private @List(@SafeHtml) Collection<String> conclusions;
	
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
	public @List(@SafeHtml) Collection<String> getConclusions() {
		return conclusions;
	}
	public void setConclussions(@List(@SafeHtml) Collection<String> collection) {
		this.conclusions = collection;
	}

	
}
