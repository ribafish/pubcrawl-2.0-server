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

    @Column(name = "pubImage")
    private byte [] pubImage;

    @Column(name = "price")
    private int price;

    @Column(name = "rating")
    private int rating;

    /*@NotNull*/
    @Column(name = "lat")
    private double lat;

    /*@NotNull*/
    @Column(name = "lng")
    private double lng;

    @Column(name = "description", length = 10485760)
    private String description;

    @Column(name = "adress")
    private String adress;

    @Column(name = "size")
    private int size;

    @Column(name = "closingTime")
    private String closingTime;

    @Column(name = "openingTime")
    private String openingTime;

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
                ", price=" + price +
                ", rating=" + rating +
                ", lat=" + lat +
                ", lng=" + lng +
                ", description='" + description + '\'' +
                ", size=" + size +
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

    public byte[] getPubImage() {
        return pubImage;
    }

    public void setPubImage(byte[] pubImage) {
        this.pubImage = pubImage;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(String closingTime) {
        this.closingTime = closingTime;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
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