
package drafter.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import drafter.repositories.DepartmentRepository;
import drafter.domain.Department;

@Service
@Transactional
public class DepartmentService {

	//Repository-------------------------------------------------------------------------------

	@Autowired
	private DepartmentRepository	departmentRepository;


	//Constructor------------------------------------------------------------------------------

	public DepartmentService() {
		super();
	}

	//CRUD Methods------------------------------------------------------------------------------

    public Department create(Department department) {
        return departmentRepository.save(department);
    }

    public Department delete(int id) {
        Department department = findById(id);
        if(department != null){
        	departmentRepository.delete(department);
        }
        return department;
    }

	public List<Department> findAll() {
        return departmentRepository.findAll();
    }

    public Department findById(int id) {
        return departmentRepository.getOne(id);
    }

    public Department update(Department department) {
        return null;
    }

	//Other business Methods-----------------------------------------------------------------------------

    

}

