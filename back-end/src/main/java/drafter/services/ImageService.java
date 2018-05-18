package drafter.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Image;
import drafter.domain.User;
import drafter.repositories.ImageRepository;


@Service
@Transactional
public class ImageService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private ImageRepository	imageRepository;
	
	@Autowired
	private UserService	userService;
	

	//Constructor------------------------------------------------------------------------------

	public ImageService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Image find(int userId) {
        return imageRepository.findByUser(userId);
    }

	public Image save(byte[] data) {
		User user = userService.findByPrincipal();
		Image old = find(user.getId());
		if(old == null)
			old = new Image();
		old.setUser(user);
		old.setData(data);
		
		user.setPhoto("/data/image/" + user.getId());
		userService.save(user);
		
		return imageRepository.save(old);
	}

}
