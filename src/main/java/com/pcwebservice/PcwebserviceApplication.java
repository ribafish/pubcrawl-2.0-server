package com.pcwebservice;

import com.pcwebservice.model.*;
import com.pcwebservice.security.WebSecurityConfig;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
@EnableOAuth2Sso
public class PcwebserviceApplication extends WebSecurityConfig {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(PcwebserviceApplication.class, args);
    }

    /*
    * Creating dummy data here using the defined repositories
    * */
    @Bean
    public CommandLineRunner demo(CrawlerRepository repository, EventRepository eventRepository, PubRepository pubRepository) {
        return (args) -> {

            Crawler dummy = new Crawler("Admin", "00000000000000000000000", "http://www.knowmuhammad.org/img/noavatarn.png");
            repository.save(dummy);
            Pub d1 = new Pub("Molly Mallones", 52.525387, 13.385950);
            d1.setPubOwner(dummy);
            Pub d2 = new Pub("Harfe", 52.523546, 13.385199);
            d2.setPubOwner(dummy);
            Pub d3 = new Pub("Diagon Alley", 52.528282, 13.393073);
            d3.setPubOwner(dummy);
            Pub d4 = new Pub("Nordbahnhof", 52.531591, 13.387613);
            d4.setPubOwner(dummy);
            Pub d5 = new Pub("Phuket Pub", 52.527409, 13.382590);
            d5.setPubOwner(dummy);
            Pub d6 = new Pub("Grimm Center", 52.521500, 13.391271);
            d6.setPubOwner(dummy);
            Pub d7 = new Pub("37min drive", 52.522017, 13.381914);
            d7.setPubOwner(dummy);
            Pub d8 = new Pub("Travellers Hostel", 52.522639, 13.387967);
            d8.setPubOwner(dummy);
            pubRepository.save(d1);
            pubRepository.save(d2);
            pubRepository.save(d3);
            pubRepository.save(d4);
            pubRepository.save(d5);
            pubRepository.save(d6);
            pubRepository.save(d7);
            pubRepository.save(d8);


/*
            //Development functions.

            eventRepository.save(new Event("PubEvent1", 1483885590L, repository.findByuserName("Jack"), null));
            eventRepository.save(new Event("PubEvent2", 1483833490L, repository.findByuserName("Kim"), null));
            eventRepository.save(new Event("PubEvent3", 1483883412L, repository.findByuserName("Michelle"), null));

            log.info("Customers found with findAll():");
            log.info("-------------------------------");
            for (Crawler Crawler : repository.findAll()) {
                log.info(Crawler.toString());
            }
            log.info("");

            log.info("Pubs found with findAll():");
            log.info("-------------------------------");
            for (Pub pub : pubRepository.findAll()) {
                log.info(pub.toString());
            }
            log.info("");


            log.info("Customers found with findAll():");
            log.info("-------------------------------");
            for (Event event : eventRepository.findAll()) {
                log.info(event.toString());
            }
            log.info("");*/


        };
    }
}
