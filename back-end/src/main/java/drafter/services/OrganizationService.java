package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.domain.Organization;
import drafter.repositories.OrganizationRepository;

@Service
@Transactional
public class OrganizationService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private OrganizationRepository	organizationRepository;


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

	//Other business Methods-----------------------------------------------------------------------------

}
