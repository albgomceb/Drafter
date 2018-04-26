package drafter.utilities;

import java.util.List;

public class Pagination<T> {
	
	private List<T> beans;
	private int numberOfPage;
	private boolean hasPreviousPage;
	private boolean hasNextPage;
	
	public Pagination(List<T> page, int numberOfPage, boolean hasPreviousPage, boolean hasNextPage) {
		setBeans(page);
		setNumberOfPage(numberOfPage);
		setHasPreviousPage(hasPreviousPage);
		setHasNextPage(hasNextPage);
	}
	
	public List<T> getBeans() {
		return beans;
	}

	public void setBeans(List<T> beans) {
		this.beans = beans;
	}
	
	public int getNumberOfPage() {
		return numberOfPage;
	}

	public void setNumberOfPage(int numberOfPage) {
		this.numberOfPage = numberOfPage;
	}

	public boolean getHasPreviousPage() {
		return hasPreviousPage;
	}
	
	public void setHasPreviousPage(boolean hasPreviousPage) {
		this.hasPreviousPage = hasPreviousPage;
	}
	
	public boolean getHasNextPage() {
		return hasNextPage;
	}
	
	public void setHasNextPage(boolean hasNextPage) {
		this.hasNextPage = hasNextPage;
	}
	
}
