package drafter.beans.idea;

import java.util.List;

import drafter.beans.Option;

public class IdeaBean {

	public String text; 
	public Double ratingValue;
	public List<Option> votes; 
	
	
	public String getText() {
		return text;
	}
	
	public void setText(String text) {
		this.text = text;
	}
	
	public Double getRatingValue() {
		return ratingValue;
	}
	
	public void setRatingValue(Double ratingValue) {
		this.ratingValue = ratingValue;
	}
	

	public List<Option> getVotes() {
		return votes;
	}

	public void setVotes(List<Option> votes) {
		this.votes = votes;
	}

	
}
