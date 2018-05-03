package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.beans.organization.OrganizationBean;
import drafter.beans.organization.OrganizationSerializer;
import drafter.domain.Department;
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

	public void deleteDepartment(OrganizationBean organizationBean, Organization result, Organization old) {

		// Tengo un problema y es que tanto result como old vienen pruneados y no puede acceder a sus list
		// TODO En el caso de que se haya eliminado un usuario de un departamento, tenemos que
		// reflejarlo en su lista de departamentos quitando ese departamento
		if(new Integer(organizationBean.getId()) > 0) {
			for(Department dOld: old.getDepartments()) { 		// Recorro la vieja organización
				if(!result.getDepartments().contains(dOld)) { 	// Si se ha eliminado un departamento
					for(User uOld: dOld.getUsers()) { 			// Cojo los usuarios que estaban dentro
						List<Department> listDe = uOld.getDepartments();
						listDe.remove(dOld);  					// Y les quito ese departamento de su lista de departamentos
						uOld.setDepartments(listDe);
						userService.save(uOld);
					}
				} else { // En caso de que no se haya eliminado el departamento
					for(Department dNew: result.getDepartments()) {
						for(User uOld: dOld.getUsers()) {
							if(!dNew.getUsers().contains(uOld)) { // Compruebo si se han eliminado miembros
								List<Department> listDe = uOld.getDepartments();
								listDe.remove(dNew); 			// Y les quito ese departamento de su lista de departamentos
								uOld.setDepartments(listDe);
								userService.save(uOld);
							}
						}
					}
				}
			}
		}
		
	}

}
