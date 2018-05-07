package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.organization.OrganizationBean;
import drafter.beans.organization.OrganizationSerializer;
import drafter.domain.Organization;
import drafter.domain.User;
import drafter.repositories.OrganizationRepository;

@Service
@Transactional
public class OrganizationService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private OrganizationRepository	organizationRepository;
	
	@Autowired
	private UserService	userService;

	@Autowired
	private DepartmentService departmentService;
	
	//Service---------------------------------------------------------------------------------

	
	//Constructor------------------------------------------------------------------------------

	public OrganizationService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Organization create(Organization organization) {
        return organizationRepository.save(organization);
    }

    public Organization delete(int id) {
    	Organization organization = findById(id);
        if(organization != null){
        	organizationRepository.delete(organization);
        }
        return organization;
    }

	public List<Organization> findAll() {
        return organizationRepository.findAll();
    }

    public Organization findById(Integer id) {
        return organizationRepository.findById(id).orElse(null);
    }
    
    public Organization save(Organization organization) {
		return organizationRepository.save(organization);
	}

	public Organization saveBean(OrganizationBean organizationBean, int userId) {
		User user = userService.findById(new Integer(userId));
		User userLogued = userService.findByPrincipal();
		if(!userLogued.equals(user)) {
			return null;
		}
		
		return save(new OrganizationSerializer().fromBean(organizationBean, user, userService, this, departmentService));
	}

	//Other business Methods-----------------------------------------------------------------------------

	public List<Organization> findByUserId(int userId) {
		return organizationRepository.findByUserId(userId);
	}

}
