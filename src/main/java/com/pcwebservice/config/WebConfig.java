package com.pcwebservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.security.Principal;
import java.util.List;

/**
 * Created by Leo on 07.12.2016.
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        PageableHandlerMethodArgumentResolver resolver = new PageableHandlerMethodArgumentResolver();
        resolver.setFallbackPageable(new PageRequest(0, 50));
        argumentResolvers.add(resolver);
        super.addArgumentResolvers(argumentResolvers);
    }

    /**
     * Maps all AngularJS routes to index so that they work with direct linking.
     */
    @Controller
    static class Routes {

        @RequestMapping({
                "/create",
                "/event",
                "/register",
                "/login",
                "/googleRedirect",
                "/rethink"
        })
        public ModelAndView redirection(ModelMap model, @ModelAttribute("Principal") Principal Principal) {
            model.addAttribute("Principal", Principal);
            return new ModelAndView("forward:/index.html", model);
        }
/*
        public String index() {
            return "forward:/index.html";
        }
    }*/
    }
}