package drafter.beans.idea;

import java.util.Collection;

import drafter.beans.cons.ConsBean;
import drafter.beans.pros.ProsBean;
import drafter.beans.vote.VoteBean;


public class IdeaBean {
	
	private int id;
	private int number; 
	private String text; 
	private Double ratingValue; 
	private int brainstormingId;
	private Collection<ProsBean> pros; 
	private Collection<ConsBean> cons;
	private Collection<VoteBean> votes;

	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getBrainstormingId() {
		return brainstormingId;
	}
	public void setBrainstormingId(int brainstormingId) {
		this.brainstormingId = brainstormingId;
	}
	public Collection<ProsBean> getPros() {
		return pros;
	}
	public void setPros(Collection<ProsBean> pros) {
		this.pros = pros;
	}
	public Collection<ConsBean> getCons() {
		return cons;
	}
	public void setCons(Collection<ConsBean> cons) {
		this.cons = cons;
	}
	public Collection<VoteBean> getVotes() {
		return votes;
	}
	public void setVotes(Collection<VoteBean> votes) {
		this.votes = votes;
	}
	public Double getRatingValue() {
		return ratingValue;
	}
	public void setRatingValue(Double ratingValue) {
		this.ratingValue = ratingValue;
	} 
	
	
}
