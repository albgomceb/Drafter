package drafter.beans.sixHats;

import java.util.ArrayList;

public class HatBean {

	private int id;
	private String color;
	private int order;
	private ArrayList<String> conclusions;
	
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
	public ArrayList<String> getConclusions() {
		return conclusions;
	}
	public void setConclussions(ArrayList<String> conclusions) {
		this.conclusions = conclusions;
	}

	
}
