package com.pcwebservice.controller;

import com.pcwebservice.model.Crawler;
import com.pcwebservice.model.CrawlerRepository;
import net.minidev.json.JSONObject;
import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * Created by Leo on 01.12.2016.
 */

@RestController
public class CustomController {

    @Autowired
    CrawlerRepository repository;

    @RequestMapping(value = "/hello")
    public ArrayList <Crawler> crawler() {

        return repository.findByTitleIs();

        //return new Crawler("hallo","hallo");
    };

}