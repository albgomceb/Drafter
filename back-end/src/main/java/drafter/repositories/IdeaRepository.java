package drafter.repositories;

import java.util.Collection;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Idea;

@Repository
public interface IdeaRepository extends JpaRepository<Idea,Integer>{
	
	@Query("select bs.ideas from BrainStorming bs join bs.ideas i where bs.id ?= 1 order by i.ratingValue DESC ")
	Collection<Idea> findIdeasByBSId(int id); 
	
}
