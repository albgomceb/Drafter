package drafter;

import java.io.ByteArrayOutputStream;
import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.Scanner;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;

@SpringBootApplication
@Service
@Transactional
public class QueryDatabase {

	@PersistenceContext
	private EntityManager entityManager;
	
	public static void main(String[] args) {
		System.out.println("Initialising Spring Boot context...\n\n");
		
		// Run Spring Boot
		ConfigurableApplicationContext context = SpringApplication.run(QueryDatabase.class, args);

		// Run quries
		context.getBean(QueryDatabase.class).queries();
		
		// Exit
		disableOutput();
		System.exit(0);
	}
	
	private static void disableOutput() {
		System.setOut(new PrintStream(new ByteArrayOutputStream()));
		System.setErr(new PrintStream(new ByteArrayOutputStream()));
	}
	
	private static void restoreOutput() {
		System.setOut(new PrintStream(new FileOutputStream(FileDescriptor.out)));
		System.setErr(new PrintStream(new FileOutputStream(FileDescriptor.err)));
	}
	
	public void queries() {
		Scanner sc = null;
		sc = new Scanner(System.in);
		String query = "";
		System.out.print("\n\n\n\n\n\n>  ");
		disableOutput();
		while(!(query = sc.nextLine()).isEmpty()) {
			try {
				restoreOutput();
				System.out.println();
				for(Object obj : entityManager.createQuery(query).getResultList()) {
					System.out.println(obj);
				}

			} catch (Throwable e) {
				System.err.println("\n\n");
				System.err.println(e.getLocalizedMessage());
				e.printStackTrace(System.err);
			}

			System.out.print("\n\n>  ");
			disableOutput();
		}
		
		sc.close();
	}
}
