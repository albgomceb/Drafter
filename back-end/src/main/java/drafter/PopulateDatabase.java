package drafter;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.Map.Entry;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import drafter.domain.DomainEntity;

@SpringBootApplication
@Service
@Transactional
public class PopulateDatabase {
	
	private static final String pck = "drafter/";
	private static final String PATH_TEST_UTILITIES = "/src/test/java/" + pck + "utilities/";
	private static final String NAME_CLASS_UTIL = "TestConfig";

	@PersistenceContext
	private EntityManager entityManager;
	
	public static void main(String[] args) {
		System.out.println("Initialising Spring Boot context...\n\n");
		
		// No console output
		
		// Run Spring Boot
		ConfigurableApplicationContext context = SpringApplication.run(PopulateDatabase.class, args);

		// Run populate
		context.getBean(PopulateDatabase.class).populate();
		
		// Exit
		disableOutput();
		System.exit(0);
	}
	
	private static void disableOutput() {
		System.setOut(new PrintStream(new ByteArrayOutputStream()));
		System.setErr(new PrintStream(new ByteArrayOutputStream()));
	}
	
	public void populate() {
		ApplicationContext applicationContext;
		
		// Restaure console output
		System.setOut(new PrintStream(new FileOutputStream(FileDescriptor.out)));
		System.setErr(new PrintStream(new FileOutputStream(FileDescriptor.err)));
		
		try {
			System.out.println("+------------------------------------------------------------------------------------------+");
			System.out.println("|   _____                  _       _         _____        _        _                       |");
			System.out.println("|  |  __ \\                | |     | |       |  __ \\      | |      | |                      |");
			System.out.println("|  | |__) |__  _ __  _   _| | __ _| |_ ___  | |  | | __ _| |_ __ _| |__   __ _ ___  ___    |");
			System.out.println("|  |  ___/ _ \\| '_ \\| | | | |/ _` | __/ _ \\ | |  | |/ _` | __/ _` | '_ \\ / _` / __|/ _ \\   |");
			System.out.println("|  | |  | (_) | |_) | |_| | | (_| | ||  __/ | |__| | (_| | || (_| | |_) | (_| \\__ \\  __/   |");
			System.out.println("|  |_|   \\___/| .__/ \\__,_|_|\\__,_|\\__\\___| |_____/ \\__,_|\\__\\__,_|_.__/ \\__,_|___/\\___|   |");
			System.out.println("|             | |                                                                          |");
			System.out.println("|             |_|                                                                          |");
			System.out.println("+------------------------------------------------------------------------------------------+");
			
			System.out.println("\n");
			
			System.out.println("Reading 'PopulateDatabase.xml'...");
			//applicationContext = new ClassPathXmlApplicationContext("file:src/main/resources/PopulateDatabase.xml");
			applicationContext = new ClassPathXmlApplicationContext("classpath:PopulateDatabase.xml");
			
			System.out.println("Persisting " + applicationContext.getBeanDefinitionCount() + " entities...\n\n");
		
			Set<Entry<String, Object>> entries = applicationContext.getBeansWithAnnotation(Entity.class).entrySet();
			int count = 0;
			String oldBeanName = "";
			String attributes = "";
			for(Entry<String, Object> entry : entries) {
				String beanName;
				DomainEntity entity;
				boolean jump;
				
				beanName = entry.getKey();
				entity = (DomainEntity) entry.getValue();
				jump = !oldBeanName.equals(entity.getClass().getName()) && !oldBeanName.equals("");
				oldBeanName = entity.getClass().getName();
				
				System.out.print("" + (100*count/entries.size()+100/entries.size()) + "% > " +  beanName + ": " + entity.getClass().getSimpleName());
				entityManager.persist(entity);
				System.out.println(" -> id = " + entity.getId());
				
				attributes += generateAttribute(beanName, entity.getId(), jump);
				
				count++;
			}
			
			boolean saved = saveTextFile(PATH_TEST_UTILITIES + NAME_CLASS_UTIL + ".java", getTemplate(attributes));
			if(saved)
				System.out.println("\nFile util created correctly in " + PATH_TEST_UTILITIES + NAME_CLASS_UTIL + ".java \nPlease refresh the Project Explorer with F5");
			else
				System.out.println("\nERROR > Fail to create file util " + PATH_TEST_UTILITIES + NAME_CLASS_UTIL + ".java!!!");
			
			System.out.println("\n\nFinish!!");
		} catch (Throwable e) {
			System.err.println("\n\n");
			System.err.println(e.getLocalizedMessage());
			e.printStackTrace(System.err);		
		}
	}	

	
	private static String getTemplate(String attributes) {
		return "package " + pck.replace("/", ".") + "utilities;\n"
				+ "\n"
				+ "public class " + NAME_CLASS_UTIL + " {\n"
				+ "\t\n"
				+ attributes
				+ "\t\n"
				+ "}\n";
	}
	
	private static String generateAttribute(String beanId, int id, boolean jump) {
		return (jump ? "\n" : "") + "\tpublic static final int " + beanId + " = " + id + ";\n";
	}
	
	private static boolean saveTextFile(String path, String text) {
		try {
			File abs = new File("./" + path).getAbsoluteFile().getCanonicalFile();
			File dir = abs.getParentFile();
			if(!dir.exists())
				dir.mkdirs();
			
			PrintWriter out = new PrintWriter(abs.getAbsolutePath(), "UTF-8");
			out.print(text);
			out.close();
		} catch(Throwable e) {
			return false;
		}
		
		return true;
	}
}
