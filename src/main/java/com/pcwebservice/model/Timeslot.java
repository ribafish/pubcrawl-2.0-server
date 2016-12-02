package com.pcwebservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Time;

/**
 * Created by Leo on 02.12.2016.
 */
@Entity
@Table(name = "timeslot")
public class Timeslot implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    /*@NotNull*/
    @Column(name = "startingTime")
    private Time startingTime;

/*    @NotNull*/
    @Column(name = "endingTime")
    private Time endingTime;

  /*  @NotNull*/
    @Column(name = "pubId")
    private long pubId;

    protected Timeslot(){

    }

    public Timeslot (Time startingTime, Time endingTime){
        this.startingTime = startingTime;
        this.endingTime = endingTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPubId() {
        return pubId;
    }

    public void setPubId(long pubId) {
        this.pubId = pubId;
    }

    public Time getStartingTime() {
        return startingTime;
    }

    public void setStartingTime(Time startingTime) {
        this.startingTime = startingTime;
    }

    public Time getEndingTime() {
        return endingTime;
    }

    public void setEndingTime(Time endingTime) {
        this.endingTime = endingTime;
    }
}
