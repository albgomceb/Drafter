package drafter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import drafter.domain.Image;

@Repository

public interface ImageRepository extends JpaRepository<Image, Integer> {
	
    @Query("select i from Image i where i.user.id = ?1")
    Image findByUser(int id);

}
