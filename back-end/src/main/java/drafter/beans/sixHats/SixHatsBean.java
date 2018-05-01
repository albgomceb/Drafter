package drafter.beans.sixHats;

import java.util.Collection;

public class SixHatsBean {

	private int meetingId;
	private int secondsLeft;
	private Collection<HatBean> hats;
	
	public int getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(int meetingId) {
		this.meetingId = meetingId;
	}
	
	public int getSecondsLeft() {
		return secondsLeft;
	}
	public void setSecondsLeft(int secondsLeft) {
		this.secondsLeft = secondsLeft;
	}
	public Collection<HatBean> getHats() {
		return hats;
	}
	public void setHats(Collection<HatBean> hats) {
		this.hats = hats;
	}
	
}
