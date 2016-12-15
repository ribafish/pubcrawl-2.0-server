package com.pcwebservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Leo on 07.11.2016.
 */

@Entity
public class Event implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column(name = "eventName")
    private String eventName;

    /*@NotNull*/
    @Column(name = "date")
    private String date;

    @Column(name = "description" , length=10485760)
    private String description;

    @Column(name = "tracked")
    private boolean tracked;

    @Column(name = "timeslotList")
    private ArrayList<Timeslot> timeslotList;

    @ManyToMany(mappedBy = "eventsList")
    private List<Crawler> participantsList;

    @ManyToMany
    private List <Pub> pubsList;

    /*@NotNull*/
    @ManyToOne
    private Crawler eventOwner;

    /*Functions*/

    protected Event() {
    }

    public Event(String eventName, String date, Crawler eventOwner, List <Pub> pubsList) {
        this.eventName = eventName;
        this.date = date;
        this.eventOwner = eventOwner;
        this.pubsList = pubsList;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", tracked=" + tracked +
                ", participantsList=" + participantsList +
                ", eventOwner=" + eventOwner +
                ", pubsList=" + pubsList +
                '}';
    }

    /*Getters and Setters*/

    public ArrayList<Timeslot> getTimeslotList() {
        return timeslotList;
    }

    public void setTimeslotList(ArrayList<Timeslot> timeslotList) {
        this.timeslotList = timeslotList;
    }

    public void setEventOwner(Crawler eventOwner) {
        this.eventOwner = eventOwner;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isTracked() {
        return tracked;
    }

    public void setTracked(boolean tracked) {
        this.tracked = tracked;
    }

    public List<Crawler> getParticipantsList() {
        return participantsList;
    }

    public void setParticipantsList(List<Crawler> participantsList) {
        this.participantsList = participantsList;
    }

    public Crawler getEventOwner() {
        return eventOwner;
    }

    public void setOwner(Crawler eventOwner) {
        this.eventOwner = eventOwner;
    }

    public List<Pub> getPubsList() {
        return pubsList;
    }

    public void setPubsList(List<Pub> pubsList) {
        this.pubsList = pubsList;
    }
}