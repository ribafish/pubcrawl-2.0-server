package com.pcwebservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Leo on 07.12.2016.
 */

@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    /**
     * Maps all AngularJS routes to index so that they work with direct linking is needed because the webapp is running on same server...
     */
    @Controller
    static class Routes {

        @RequestMapping({
                "/create",
                "/event",
                "/register",
                "/login",
                "/rethink"
        })
        public String index() {
            return "forward:/index.html";
        }
    }
}