package drafter.utilities;

import java.util.List;

public class Pagination<T> {
	
	private List<T> beans;
	private int numberOfPage;
	private int totalPages;
	private boolean hasPreviousPage;
	private boolean hasNextPage;
	
	public Pagination(List<T> beans, int numberOfPage, int totalPages, boolean hasPreviousPage, boolean hasNextPage) {
		setBeans(beans);
		setNumberOfPage(numberOfPage);
		setTotalPages(totalPages);
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
	
	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
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
