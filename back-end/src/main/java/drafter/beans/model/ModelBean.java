package drafter.beans.model;

public class ModelBean<T> {
	
	private String type;
	private T model;
	private DataModelBean data;
	private String name;
	
	
	public ModelBean() {
		super();
	}

	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public T getModel() {
		return model;
	}

	public void setModel(T model) {
		this.model = model;
	}

	public DataModelBean getData() {
		return data;
	}

	public void setData(DataModelBean data) {
		this.data = data;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
