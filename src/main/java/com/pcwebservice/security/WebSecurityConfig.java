package com.pcwebservice.security;

/*
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
*/

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/login**", "/home")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and().logout().logoutSuccessUrl("/").permitAll()
                .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }
}

    /*private static final String LOGIN_PATH = "/login";

    @Autowired
    private PCUserDetailsService userDetailsService;
    @Autowired
    private HttpAuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private AuthSuccessHandler authSuccessHandler;
    @Autowired
    private AuthFailureHandler authFailureHandler;
    @Autowired
    private HttpLogoutSuccessHandler logoutSuccessHandler;

  *//*  @Bean RemoteTokenServices remoteTokenServices() {
        RemoteTokenServices rts = new RemoteTokenServices();
        rts.setClientId(clientId);
        rts.setClientSecret(clientSecret);
        rts.setCheckTokenEndpointUrl(identityServerUrl + "/check_token");
        return rts;
    }
*//*
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    @Override
    public UserDetailsService userDetailsServiceBean() throws Exception {
        return super.userDetailsServiceBean();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder(10));

        return authenticationProvider;
    }



    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                .antMatchers("/login*//**
 * ","/bower_components","/rethink","/js","/register","/fonts","/css","/config","/home","/browser").permitAll();
 * http.csrf().disable()
 * .authenticationProvider(authenticationProvider())
 * .exceptionHandling()
 * .authenticationEntryPoint(authenticationEntryPoint)
 * .and()
 * .formLogin()
 * .defaultSuccessUrl("/")
 * .loginPage("/login")
 * .permitAll()
 * .loginProcessingUrl(LOGIN_PATH)
 * .usernameParameter("user")
 * .passwordParameter("password")
 * .successHandler(authSuccessHandler)
 * .failureHandler(authFailureHandler)
 * .and()
 * .logout()
 * .permitAll()
 * .logoutRequestMatcher(new AntPathRequestMatcher(LOGIN_PATH, "DELETE"))
 * .logoutSuccessHandler(logoutSuccessHandler);
 * ","/rethink","/js","/register","/fonts","/css","/config","/home","/browser").permitAll();
 * http.csrf().disable()
 * .authenticationProvider(authenticationProvider())
 * .exceptionHandling()
 * .authenticationEntryPoint(authenticationEntryPoint)
 * .and()
 * .formLogin()
 * .defaultSuccessUrl("/")
 * .loginPage("/login")
 * .permitAll()
 * .loginProcessingUrl(LOGIN_PATH)
 * .usernameParameter("user")
 * .passwordParameter("password")
 * .successHandler(authSuccessHandler)
 * .failureHandler(authFailureHandler)
 * .and()
 * .logout()
 * .permitAll()
 * .logoutRequestMatcher(new AntPathRequestMatcher(LOGIN_PATH, "DELETE"))
 * .logoutSuccessHandler(logoutSuccessHandler);
 *//**","/rethink*//**","/js*//**","/register*//**","/fonts*//**","/css*//**","/config*//**","/home*//**","/browser*//**").permitAll();
 http.csrf().disable()
 .authenticationProvider(authenticationProvider())
 .exceptionHandling()
 .authenticationEntryPoint(authenticationEntryPoint)
 .and()
 .formLogin()
 .defaultSuccessUrl("/")
 .loginPage("/login")
 .permitAll()
 .loginProcessingUrl(LOGIN_PATH)
 .usernameParameter("user")
 .passwordParameter("password")
 .successHandler(authSuccessHandler)
 .failureHandler(authFailureHandler)
 .and()
 .logout()
 .permitAll()
 .logoutRequestMatcher(new AntPathRequestMatcher(LOGIN_PATH, "DELETE"))
 .logoutSuccessHandler(logoutSuccessHandler);
 *//*
                .and()
                .sessionManagement()
                .maximumSessions(1);
*//*

        http.authorizeRequests().anyRequest().authenticated();
    }*/
