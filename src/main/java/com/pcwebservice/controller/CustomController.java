package com.pcwebservice.controller;

import com.pcwebservice.model.CrawlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}