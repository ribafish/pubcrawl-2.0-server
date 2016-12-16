## Event REST APi
Rootlink:
```
Host/events/
```

Single element Link
```
Host/events/{idOfEvent}
```
Response:
```
{
  "eventName": String,
  "date": String,
  "description": String,
  "tracked": boolean,
  "timeslotList": ListOfTimeslots,
  "_links": {
    "self": {
      "href": "http://localhost:8080/events/{idOfEvent}"
    },
    "event": {
      "href": "http://localhost:8080/events/{idOfEvent}"
    },
    "pubsList": {
      "href": "http://localhost:8080/events/{idOfEvent}/pubsList"
    },
    "participantsList": {
      "href": "http://localhost:8080/events/{idOfEvent}/participantsList"
    },
    "eventOwner": {
      "href": "http://localhost:8080/events/{idOfEvent}/eventOwner"
    }
  }
}
```
### TIMESLOT PROPERTY
Since Timeslot is just a Helper Class we will present the API here:
```
{
    startingTime: Time,
    endingTime: Time,
    pubId: String
                    }
```
Time is an String with in the form of :
```
"hh:mm:ss"  eg.: "12:45:00"
```
pubId is just a String with the href to a pub like:
```
"http://localhost:8080/pubs/{idOfPub}"
```
The List shows the order of pubs visited in an event AND can be used to set opening/closing hours for pubs. Since setting timeslots is optional the frontend has to handle the possibilty of emptiness.

### CREATING
While developement is ongoing there are no required fields except eventName.

So POST may be:
```
Host/events/
```
```
{
  "eventName": "PubCool"
}
```
An ID will be generated but more Properties can be added and set.

### UPDATING

Properties can be changed with PATCH :
```
Host/events/{idOfEvent}
```
```
{
  "description": "Cool Event"
}
```
# Links
self : returns a href to the current model
event : returns a href to the current model
```
"self": {
            "href": "http://localhost:8080/events/{idOfEvent}"
          },
"event": {
            "href": "http://localhost:8080/events/{idOfEvent}"
          }
```

#### pubsList : returns a href to a List of Pubs 
> a list of all pubs the event contains

To add a pub to the pubsList a pub link must be sent: PATCH
```
Host/events/{idOfEvent}/pubsList
```
```
{
    "_links": {
               "href": "http://localhost:8080/pubs/{idOfPub}"
               }
}
```

#### eventOwner : returns a href to a certain Crawler 
> the crawler who owns the event

To add a eventOwner you have to send a crawler href with : PUT
```
Host/events/{idOfEvent}/eventOwner
```
```
{
    "_links": {
               "href": "http://localhost:8080/crawlers/{idOfCrawler}"
               }
}
```

#### participantsList : returns a href to a List of Crawlers 
> a list of Participants

To add a participant you have to add the event to the eventList of the said Crawler

##### see Crawler APi


#### Multiple Uploading:
If you like to PATCH/POST multiple Relations then the body needs an itemlist of href:
```
{
    "_links": {
      "items": [{
          "href": "http://localhost:8080/crawlers/18"
      },{
          "href": "http://localhost:8080/crawlers/19"
      }]
    }
}
```

### DELETING
Currently it is only possible to delete the whole Crawler by : DELETE 
```
Host/crawlers/{idOfCrawler}
```

to delete the complete List behind the Links with : PUT
```
Host/crawlers/{idOfCrawler}/friendsList
```
either with empty body to delete EVERYTHING or with body like :
```
{
    "_links": {
               "href": "http://localhost:8080/crawler/{ifOfCrawler}"
               }
}
```
to leave this element only.


To delete just one relation you have to put all the other link with PUT back in...

Rest will follow soon! <3

