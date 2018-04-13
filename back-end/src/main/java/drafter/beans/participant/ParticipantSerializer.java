package drafter.beans.participant;

import java.util.List;
import java.util.stream.Collectors;

import drafter.beans.Option;
import drafter.domain.Participant;

public class ParticipantSerializer {

	public static ParticipantBean fromParticipant(Participant participant) {

		ParticipantBean res = new ParticipantBean();

		res.setId(participant.getId());
		res.setHasAttended(participant.isHasAttended());
		res.setRole(participant.getRole());
		res.setUserId(participant.getUser().getId());
		res.setMeetingId(participant.getMeeting().getId());

		List<Option> depar = participant.getUser().getDepartments().stream()
				.map(us -> new Option(new Integer(us.getId()).toString(), us.getName(),
						us.getOrganization().getEnterprise()))
				.collect(Collectors.toList());

		res.setDepartments(depar);

		return res;
	}

}
