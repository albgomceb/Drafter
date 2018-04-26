package drafter.beans.model;

public class DataModelBean {
	
	private String user;
	private String userUUID;
	private int index;
	private boolean noself;
	private int id;
	private boolean replace;
	
	
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getUserUUID() {
		return userUUID;
	}
	public void setUserUUID(String userUUID) {
		this.userUUID = userUUID;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public boolean getNoself() {
		return noself;
	}
	public void setNoself(boolean noself) {
		this.noself = noself;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isReplace() {
		return replace;
	}
	public void setReplace(boolean replace) {
		this.replace = replace;
	}

}
