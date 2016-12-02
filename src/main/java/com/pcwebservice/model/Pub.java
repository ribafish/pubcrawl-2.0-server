package com.pcwebservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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

    @NotNull
    @Column(name = "pubName")
    private String pubName;

    @Column(name = "prices")
    private int prices;

    @Column(name = "rating")
    private int rating;

    /*@NotNull*/
    @Column(name = "lat")
    private double lat;

    /*@NotNull*/
    @Column(name = "lng")
    private double lng;

    @Column(name = "description")
    private String description;

    @Column(name = "size")
    private int size;

    @Column(name = "closingTime")
    private Timeslot closingTime;

    @ManyToMany
    private List<Crawler> topsList;

    @ManyToMany(mappedBy = "pubsList")
    private List<Event> eventsList;

    /*@NotNull*/
    @ManyToOne
    public Crawler pubOwner;


    /*Functions*/

    protected Pub() {
    }

    public Pub(String pubName, double lat, double lng) {
        this.pubName = pubName;
        this.lat = lat;
        this.lng = lng;
    }

    @Override
    public String toString() {
        return "Pub{" +
                "id=" + id +
                ", pubName='" + pubName + '\'' +
                /*", timesList=" + timesList +*/
                ", prices=" + prices +
                ", rating=" + rating +
                ", lat=" + lat +
                ", lng=" + lng +
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

    public double getLat() {
        return lat;
    }

    public void setLat(long lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(long lng) {
        this.lng = lng;
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

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public Crawler getPubOwner() {
        return pubOwner;
    }

    public void setPubOwner(Crawler pubOwner) {
        this.pubOwner = pubOwner;
    }

    public Timeslot getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(Timeslot closingTime) {
        this.closingTime = closingTime;
    }
}