package drafter.beans.idea;

import java.util.List;

import drafter.beans.cons.ConsBean;
import drafter.beans.pros.ProsBean;
import drafter.beans.vote.VoteBean;

public class IdeaBean {
	
	private int id;
	private int version;
	private int number;
	private String text;
	private int brainId;
	private List<ProsBean> pros;
	private List<ConsBean> cons;
	private List<VoteBean> votes;
	
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
	public int getBrainId() {
		return brainId;
	}
	public void setBrainId(int brainId) {
		this.brainId = brainId;
	}
	public List<ProsBean> getPros() {
		return pros;
	}
	public void setPros(List<ProsBean> pros) {
		this.pros = pros;
	}
	public List<ConsBean> getCons() {
		return cons;
	}
	public void setCons(List<ConsBean> cons) {
		this.cons = cons;
	}
	public List<VoteBean> getVotes() {
		return votes;
	}
	public void setVotes(List<VoteBean> votes) {
		this.votes = votes;
	}
	public int getVersion() {
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	
	

}
