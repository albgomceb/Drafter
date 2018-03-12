package drafter.domain;

import java.lang.reflect.Field;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Version;

@Entity
@Access(AccessType.PROPERTY)
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class DomainEntity {

	private int id;
	private int version;


	public DomainEntity() {
		super();
	}
	

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	@Version
	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	

	@Override
	public int hashCode() {
		return this.getId();
	}

	@Override
	public boolean equals(Object other) {
		boolean result;

		if (this == other)
			result = true;
		else if (other == null)
			result = false;
		else if (other instanceof Integer)
			result = (this.getId() == (Integer) other);
		else if (!this.getClass().isInstance(other))
			result = false;
		else
			result = (this.getId() == ((DomainEntity) other).getId());

		return result;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(this.getClass().getSimpleName() + " -> {\n");
		for(Field f : getFields(this.getClass(), this, null)) {
			try {
				f.setAccessible(true);
				String str;
				if(DomainEntity.class.isAssignableFrom(f.getType())) {
					DomainEntity other = (DomainEntity) f.get(this);
					str = "["+ (other!=null?other.getId():"null") + "]";
				} else {
					str = ""+f.get(this);
					if(str.length() > 180)
						str = str.substring(0, 180) + "...";
				}
				
				sb.append("\t"+f.getName());
				sb.append(": ");
				sb.append(str+";\n");
			} catch (Throwable e) {
				e.printStackTrace();
			}
		}
		sb.append("}\n");
		return sb.toString();
	}
	
	private static List<Field> getFields(Class<?> clazz, Object obj, List<Field> res) {
		if(res == null)
			res = new LinkedList<Field>();
		
		if(clazz.getSuperclass() != null)
			getFields(clazz.getSuperclass(), obj, res);
		
		for(Field f : clazz.getDeclaredFields())
			res.add(f);
		
		return res;
	}
	
}

