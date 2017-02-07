package com.pcwebservice.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/nav/**", "/config/**", "/login/**", "/bower_components/**", "/js/**", "/home/**").permitAll()
                .anyRequest().authenticated()
                .and().logout().logoutSuccessUrl("/").permitAll()
                .and().csrf().disable();

/*        OAuth2ClientAuthenticationProcessingFilter oauth2Filter = new OAuth2ClientAuthenticationProcessingFilter("/login");
        oauth2Filter.setAuthenticationSuccessHandler(new SimpleUrlAuthenticationSuccessHandler() {

            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                this.setDefaultTargetUrl("/login");
                super.onAuthenticationSuccess(request, response, authentication);
            }
        });*/
    }
}



