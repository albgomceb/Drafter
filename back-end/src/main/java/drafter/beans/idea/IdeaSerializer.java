package drafter.beans.idea;


import org.springframework.beans.factory.annotation.Autowired;

import drafter.domain.Idea;
import drafter.services.IdeaService;

public class IdeaSerializer {

	@Autowired
	public IdeaService ideaService; 
	
	
	public IdeaSerializer() {
		
	}
	
	public IdeaBean fromIdea(Idea idea) {
		
		IdeaBean res = new IdeaBean(); 
		res.setText(idea.getText());
		res.setRatingValue(idea.getRatingValue());
		
		return res; 

	}

}
