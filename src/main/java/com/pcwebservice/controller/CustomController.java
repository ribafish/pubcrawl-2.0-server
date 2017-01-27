package com.pcwebservice.controller;

import com.pcwebservice.model.CrawlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Base64;

/**
 * Created by Leo on 01.12.2016.
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

    @RequestMapping(value = "/hello", produces = "text/plain")
    public String crawler() {
        return crawlerRepository.findTitleById(1L);
    }

    @RequestMapping(value = "/image/crawler/{id}", method = RequestMethod.POST)
    public void setImage(@PathVariable Long id, @RequestBody String body) {
        byte[] bytesEncoded = Base64.getEncoder().encode(body.getBytes());
        crawlerRepository.findByid(id).setUserImage(bytesEncoded);
        crawlerRepository.save(crawlerRepository.findByid(id));
    }

    @RequestMapping(value = "/image/crawler/{id}", method = RequestMethod.GET, produces = "text/plain")
    public String getImage(@PathVariable Long id) {
        return new String(Base64.getDecoder().decode(crawlerRepository.findByid(id).getUserImage()));
    }

}