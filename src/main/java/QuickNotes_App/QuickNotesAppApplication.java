package QuickNotes_App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuickNotesAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuickNotesAppApplication.class, args);
		System.out.println("Spring boot application started");
	}

}
