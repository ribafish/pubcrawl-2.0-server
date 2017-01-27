/*
package com.pcwebservice.security;

import com.pcwebservice.model.Crawler;
import com.pcwebservice.model.CrawlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

*/
/**
 * Created by Leo on 11.01.2017.
 *//*

@Component
public class PCUserDetailsService implements UserDetailsService {

    @Autowired
    CrawlerRepository crawlerRepository;

    @Override
    public PCUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Crawler user = crawlerRepository.findByuserName(username);
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        System.out.println("name :" + username);
        System.out.println("User: " + user);
        System.out.println("Role :" + user.getRole());
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole()));
        PCUserDetails details = new PCUserDetails(user, grantedAuthorities);
            return details;
    }
}
*/
