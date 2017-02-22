package com.pcwebservice.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Leo on 02.12.2016.
 */
@Entity
@Table(name = "timeslot")
public class Timeslot implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "startingTime")
    private long startingTime;

    @Column(name = "endingTime")
    private long endingTime;

    @Column(name = "pubId")
    private String pubId;

    protected Timeslot(){

    }

    public Timeslot (long startingTime, long endingTime){
        this.startingTime = startingTime;
        this.endingTime = endingTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPubId() {
        return pubId;
    }

    public void setPubId(String pubId) {
        this.pubId = pubId;
    }

    public long getStartingTime() {
        return startingTime;
    }

    public void setStartingTime(long startingTime) {
        this.startingTime = startingTime;
    }

    public long getEndingTime() {
        return endingTime;
    }

    public void setEndingTime(long endingTime) {
        this.endingTime = endingTime;
    }
}
