package drafter.beans.brainstorming;

import java.util.Date;
import java.util.List;

import drafter.beans.Option;

public class BrainStormingBean {
	
	public String title;
	public Date date;
	public Date timer;
	public List<Option> ideas;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}


	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getTimer() {
		return timer;
	}

	public void setTimer(Date timer) {
		this.timer = timer;
	}

	public List<Option> getIdeas() {
		return ideas;
	}

	public void setIdeas(List<Option> ideas) {
		this.ideas = ideas;
	}

}
