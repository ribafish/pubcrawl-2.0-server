package com.pcwebservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

/**
 * Created by Leo on 07.12.2016.
 *
 * Declare which resources should be protected as well as using the APiTokenAccessFilter to get OAuth running.
 */

public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private ResourceServerTokenServices tokenServices;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/nav/**", "/config/**", "/css/**", "/login/**", "/bower_components/**", "/js/**", "/home/**", "/rethink/**", "/index.html", "/user").permitAll()
                .anyRequest().authenticated()
                .and().addFilterAfter(new ApiTokenAccessFilter(tokenServices), AbstractPreAuthenticatedProcessingFilter.class);
        http.logout().logoutSuccessUrl("/").permitAll()
                .and().csrf().disable(); //TODO: CSRF Proctection
    }
}



