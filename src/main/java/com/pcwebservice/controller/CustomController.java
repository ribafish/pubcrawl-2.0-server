package com.pcwebservice.controller;

import com.pcwebservice.model.CrawlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

/**
 * Created by Leo on 01.12.2016.
 */

@RestController
public class CustomController {

    @Autowired
    CrawlerRepository repository;

    @RequestMapping(value = "/hello",produces = "text/plain")
    public String crawler() {

        return repository.findTitleById(1L);

    }

    @RequestMapping(value = "/image/{id}",method = RequestMethod.POST)
    public void setImage(@PathVariable Long id, @RequestBody String body) {
        System.out.println(body);

        byte[] bytesEncoded = Base64.getEncoder().encode(body.getBytes());
        System.out.println(bytesEncoded);
        System.out.println( repository.findByid(id));
        repository.findByid(id).setUserImage(bytesEncoded);
        repository.save(repository.findByid(id));
    }

    @RequestMapping(value = "/image/{id}",method = RequestMethod.GET, produces = "text/plain")
    public String getImage(@PathVariable Long id) {
        repository.findByid(id).setEmail("Hallo.de");
        return new String (Base64.getDecoder().decode(repository.findByid(id).getUserImage()));
    }


}