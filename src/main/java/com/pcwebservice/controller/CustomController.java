package com.pcwebservice.controller;

import com.pcwebservice.model.CrawlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by Leo on 01.12.2016.
 *
 * Restcontroller to give out the Principal provided by Google
 *
 * Also possible to create new Restendpoints here.
 */

@RestController
@EnableOAuth2Sso
public class CustomController {

    @Autowired
    CrawlerRepository crawlerRepository;

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

}