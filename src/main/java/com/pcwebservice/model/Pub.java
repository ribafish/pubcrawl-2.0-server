package com.pcwebservice.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by Leo on 07.11.2016.
 */

@Entity
public class Pub implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "pubName")
    private String pubName;

/*
    @Column(name = "timesList")
    @ManyToMany(targetEntity=TSlot.class, mappedBy="TSlot.id", fetch=FetchType.EAGER)
    private List<TSlot> timesList;
*/

    @Column(name = "prices")
    private int prices;

    @Column(name = "rating")
    private int rating;

    @Column(name = "description")
    private String description;

    @Column(name = "size")
    private int size;

    @ManyToMany
    private List <Crawler> topsList;

    @ManyToMany
    private List<Event> eventsList;

    @OneToOne
    public Crawler pubOwner;


    /*Functions*/

    protected Pub() {
    }

    public Pub(String pubName, int size, Crawler pubOwner) {
        this.pubName = pubName;
        this.size = size;
        this.pubOwner = pubOwner;
    }

    @Override
    public String toString() {
        return "Pub{" +
                "id=" + id +
                ", pubName='" + pubName + '\'' +
                /*", timesList=" + timesList +*/
                ", prices=" + prices +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", size=" + size +
                ", topsList=" + topsList +
                ", eventsList=" + eventsList +
                ", pubOwner=" + pubOwner +
                '}';
    }

    /*Getters and Setters*/

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPubName() {
        return pubName;
    }

    public void setPubName(String pubName) {
        this.pubName = pubName;
    }

/*    public List<TSlot> getTimesList() {
        return timesList;
    }

    public void setTimesList(List<TSlot> timesList) {
        this.timesList = timesList;
    }*/

    public int getPrices() {
        return prices;
    }

    public void setPrices(int prices) {
        this.prices = prices;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<Crawler> getTopsList() {
        return topsList;
    }

    public void setTopsList(List<Crawler> topsList) {
        this.topsList = topsList;
    }

    public List<Event> getEventsList() {
        return eventsList;
    }

    public void setEventsList(List<Event> eventsList) {
        this.eventsList = eventsList;
    }

    public Crawler getPubOwner() {
        return pubOwner;
    }

    public void setPubOwner(Crawler pubOwner) {
        this.pubOwner = pubOwner;
    }
}