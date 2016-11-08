package com.pcwebservice.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Leo on 05.11.2016.
 */

@Entity
public class Crawler implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "userName")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "description")
    private String description;

    @ManyToMany
    private List <Crawler> friendsList;

    @ManyToMany
    private List <Event> eventsList;

    @OneToMany
    private List <Pub> pubsList;

    /*Functions*/

    protected Crawler() {
    }

    public Crawler(String userName, String email) {
        this.userName = userName;
        this.email = email;
    }

    /*Getters and Setters*/

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Crawler> getFriendsList() {
        return friendsList;
    }

    public void setFriendsList(List<Crawler> friendsList) {
        this.friendsList = friendsList;
    }

    public List<Event> getEventsList() {
        return eventsList;
    }

    public void setEventsList(List<Event> eventsList) {
        this.eventsList = eventsList;
    }

    public List<Pub> getPubsList() {
        return pubsList;
    }

    public void setPubsList(List<Pub> pubsList) {
        this.pubsList = pubsList;
    }
}
