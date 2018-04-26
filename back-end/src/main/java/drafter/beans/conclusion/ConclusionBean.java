package drafter.beans.conclusion;

public class ConclusionBean {
	
	private String conclusion;
	private int agendaId;
	private int id;
	private int version;
	
	
	public ConclusionBean() {
		super();
	}


	public String getConclusion() {
		return conclusion;
	}

	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
	}

	public int getAgendaId() {
		return agendaId;
	}

	public void setAgendaId(int agendaId) {
		this.agendaId = agendaId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public int getVersion() {
		return version;
	}


	public void setVersion(int version) {
		this.version = version;
	}
	
	
}
