package com.pcwebservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Leo on 05.11.2016.
 */

@Entity
@NamedQuery(name = "Crawler.findByTitleIs" ,
        query = "SELECT c FROM Crawler c WHERE userName = 'Jack'"
)
@Table(name = "crawler")
public class Crawler implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "userName")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "description")
    private String description;

    @Column(name = "userImage")
    private byte [] userImage;

    @ManyToMany
    private List<Crawler> friendsList;

    @ManyToMany
    private List<Event> eventsList;

    @ManyToMany(mappedBy = "topsList")
    private List<Pub> favourites;

    @OneToMany(mappedBy = "pubOwner")
    private List<Pub> ownPubs;

    @OneToMany(mappedBy = "eventOwner")
    private List <Event> ownEvents;

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

    @JsonIgnore
    public List<Event> getEventsList() {
        return eventsList;
    }

    public void setEventsList(List<Event> eventsList) {
        this.eventsList = eventsList;
    }

    @JsonIgnore
    public List<Pub> getOwnPubs() {
        return ownPubs;
    }

    public void setOwnPubs(List<Pub> ownPubs) {
        this.ownPubs = ownPubs;
    }

    @JsonIgnore
    public List<Pub> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<Pub> favourites) {
        this.favourites = favourites;
    }

    @JsonIgnore
    public List<Event> getOwnEvents() {
        return ownEvents;
    }

    public void setOwnEvents(List<Event> ownEvents) {
        this.ownEvents = ownEvents;
    }

    public byte[] getUserImage() {
        return  userImage;
    }

    public void setUserImage(byte[] userImage) {
        this.userImage = userImage;
    }
}
