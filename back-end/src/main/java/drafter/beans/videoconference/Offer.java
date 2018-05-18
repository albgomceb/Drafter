package drafter.beans.videoconference;

public class Offer {
	public String sdp;
	public String peerId;
	public String localId;
	public String type;
	
	
	public Offer() {
		super();
	}
	
	public Offer(String sdp, String peerId, String localId, String type) {
		super();
		this.sdp = sdp;
		this.peerId = peerId;
		this.localId = localId;
		this.type = type;
	}



	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSdp() {
		return sdp;
	}


	public void setSdp(String sdp) {
		this.sdp = sdp;
	}


	public String getPeerId() {
		return peerId;
	}


	public void setPeerId(String peerId) {
		this.peerId = peerId;
	}


	public String getLocalId() {
		return localId;
	}


	public void setLocalId(String localId) {
		this.localId = localId;
	}
	
	

}
