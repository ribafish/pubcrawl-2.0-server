/*
package com.pcwebservice.security;

*/
/**
 * Created by Leo on 11.01.2017.
 *//*


import com.pcwebservice.model.Crawler;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class PCUserDetails implements UserDetails {
    private Crawler user;
    private List<GrantedAuthority> authorities;

    public PCUserDetails (Crawler user, List<GrantedAuthority> authorities) {
        this.user = user;
        this.authorities = authorities;
    }

    public Crawler getUser() {
        return user;
    }

    public void setUser(Crawler user) {
        this.user = user;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}*/
