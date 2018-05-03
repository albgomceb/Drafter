package drafter.beans.sixHats;

import java.util.Collection;

public class SixHatsBean {

	private int meetingId;
	private Integer secondsLeft;
	private Collection<HatBean> hats;
	
	public int getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(int meetingId) {
		this.meetingId = meetingId;
	}
	
	public Integer getSecondsLeft() {
		return secondsLeft;
	}
	public void setSecondsLeft(Integer secondsLeft) {
		this.secondsLeft = secondsLeft;
	}
	public Collection<HatBean> getHats() {
		return hats;
	}
	public void setHats(Collection<HatBean> hats) {
		this.hats = hats;
	}
	
}
