package drafter.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.URL;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Access(AccessType.PROPERTY)
public abstract class Meeting extends DomainEntity{
	
	//Atributes------------------------------------------
	private String title; 
	private String description;
	private Date date;
	private Integer numberOfMeeting;
	private String image;
	private int timer;
	private boolean hasfinished;
	private int status;
	
	
	//Constructor----------------------------------------
	public Meeting() {
		super();
	}
	
	//Methods--------------------------------------------
	@NotBlank
	@SafeHtml
	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}

	@NotBlank
	@SafeHtml
	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}

	@NotNull 
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
	public Date getDate() {
		return date;
	}


	public void setDate(Date date) {
		this.date = date;
	}

	@Min(2)
	public Integer getNumberOfMeeting() {
		return numberOfMeeting;
	}


	public void setNumberOfMeeting(Integer numberOfMeeting) {
		this.numberOfMeeting = numberOfMeeting;
	}

	@Lob
	@SafeHtml
	@URL
	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}

	@Min(0)
	public int getTimer() {
		return timer;
	}

	public void setTimer(int timer) {
		this.timer = timer;
	}


	public boolean isHasfinished() {
		return hasfinished;
	}

	public void setHasfinished(boolean hasfinished) {
		this.hasfinished = hasfinished;
	}

	
	@Min(1)
	public int getStatus() {
		return status;
	}
	
	public void setStatus(int status) {
		this.status = status;
	}
	
	
	@Transient
	public abstract String getType();
	
	
	// Relationships-------------------------------------
	
	
	private Collection<Agenda> agendas; 
	private Project project; 
	private Collection<Participant> participants;
	private Collection<Step> steps; 
	 
	@NotNull
	@Valid
	@OneToMany(mappedBy = "meeting")
	public Collection<Agenda> getAgendas() {
		return agendas;
	}

	public void setAgendas(Collection<Agenda> agendas) {
		this.agendas = agendas;
	}


	@Valid
	@ManyToOne(optional = true)
	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}


	@NotNull
	@Valid
	@OneToMany(mappedBy = "meeting")
	public Collection<Participant> getParticipants() {
		return participants;
	}

	public void setParticipants(Collection<Participant> participants) {
		this.participants = participants;
	}
	
	public void addParticipant(Participant participant) {
		if(this.participants == null)
			this.participants = new ArrayList<Participant>();
		this.participants.add(participant);
		participant.setMeeting(this);
	}

	
	@NotNull
	@Valid
	@OneToMany(mappedBy = "meeting")
	public Collection<Step> getSteps() {
		return steps;
	}

	public void setSteps(Collection<Step> steps) {
		this.steps = steps;
	}

	public void addAgenda(Agenda agenda) {
		this.agendas.add(agenda);
		agenda.setMeeting(this);
	}

	
	
}
