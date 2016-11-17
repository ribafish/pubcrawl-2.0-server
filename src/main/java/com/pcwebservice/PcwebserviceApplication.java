package com.pcwebservice;

		import com.pcwebservice.model.Crawler;
		import com.pcwebservice.model.CrawlerRepository;
		import javafx.application.Application;
		import org.slf4j.Logger;
		import org.slf4j.LoggerFactory;
		import org.springframework.boot.CommandLineRunner;
		import org.springframework.boot.SpringApplication;
		import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
		import org.springframework.boot.autoconfigure.SpringBootApplication;
		import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PcwebserviceApplication {

	private static final Logger log = LoggerFactory.getLogger(Application.class);

	public static void main(String[] args) {
		SpringApplication.run(PcwebserviceApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(CrawlerRepository repository) {
		return (args) -> {
			// save a couple of customers
			repository.save(new Crawler("Jack", "Bauer"));
			repository.save(new Crawler("Chloe", "O'Brian"));
			repository.save(new Crawler("Kim", "Bauer"));
			repository.save(new Crawler("David", "Palmer"));
			repository.save(new Crawler("Michelle", "Dessler"));

			// fetch all customers
			log.info("Customers found with findAll():");
			log.info("-------------------------------");
			for (Crawler Crawler : repository.findAll()) {
				log.info(Crawler.toString());
			}
			log.info("");

			// fetch an individual customer by ID
			Crawler Crawler = repository.findOne(1L);
			log.info("Customer found with findOne(1L):");
			log.info("--------------------------------");
			log.info(Crawler.toString());
			log.info("");

			// fetch customers by last name
			log.info("Customer found with findByLastName('Bauer'):");
			log.info("--------------------------------------------");
			for (Crawler bauer : repository.findByuserName("Bauer")) {
				log.info(bauer.toString());
			}
			log.info("");
		};
	}
}
