## Pub REST APi
Rootlink:
```
Host/pubs/
```

Single element Link
```
Host/pubs/{idOfPub}
```
Response:
```
 {
        "pubName": String ,
        "prices": int,
        "rating": int,
        "lat": double,
        "lng": double,
        "description": String,
        "adress": String,
        "size": int,
        "closingTime": Timeslot,
        "_links": {
          "self": {
            "href": "http://localhost:8080/pubs/{idOfPub}"
          },
          "pub": {
            "href": "http://localhost:8080/pubs/{idOfPub}"
          },
          "pubOwner": {
            "href": "http://localhost:8080/pubs/{idOfPub}/pubOwner"
          },
          "topsList": {
            "href": "http://localhost:8080/pubs/{idOfPub}/topsList"
          },
          "eventsList": {
            "href": "http://localhost:8080/pubs/{idOfPub}/eventsList"
          }
        }
      }
```
#### Image
The Image will be saved in an array of bytes but the EndPoint is a String BASE64 endpoint so the frontend has to decode/encode the images.

### CREATING
While developement is ongoing there are no required fields except pubName.

So POST may be:
```
Host/pubs/
```
```
{
  "pubName": "Bar"
}
```
An ID will be generated but more Properties can be added and set.

### UPDATING

Properties can be changed with PATCH :
```
Host/pubs/{idOfPub}
```
```
{
  "description": "Cool Bar"
}
```
# Links
self : returns a href to the current model
pub : returns a href to the current model
```
"self": {
            "href": "http://localhost:8080/pubs/{idOfPub}"
          },
"pub": {
            "href": "http://localhost:8080/pubs/{idOfPub}"
          }
```

#### pubOwner : returns a href to a Crawler 
> crawler who owns the pub / creator

To set a crawler as pubOwner a crawler link must be sent (important the crawler needs to exist!): PUT
```
Host/pubs/{idOfPub}/pubOwner
```
```
{
    "_links": {
               "href": "http://localhost:8080/crawlers/{idOfCrawler}"
               }
}
```

#### topsList : returns a href to a List of Crawlers
> list of crawlers who visited often

To add a crawler to the topsList sent a : PATCH
```
Host/pubs/{idOfPub}/topsList
```
```
{
    "_links": {
               "href": "http://localhost:8080/crawlers/{idOfCrawler}"
               }
}
```

#### eventsList : returns a href to a List of Events 
> a list of all events who plan visiting/ visited the pub

To add an event to the eventsList the event has to add the pub to in his pubsList field
See event API

#### Multiple Uploading:
If you like to PATCH/POST multiple Relations then the body needs an itemlist of href:
```
{
    "_links": {
      "items": [{
          "href": "http://localhost:8080/events/18"
      },{
          "href": "http://localhost:8080/events/19"
      }]
    }
}
```

### DELETING
Currently it is only possible to delete the whole Crawler by : DELETE 
```
Host/pubs/{idOfPub}
```

to delete the complete List behind the Links with : PUT
```
Host/pubs/{idOfPub}/topsList
```
either with empty body to delete EVERYTHING or with body like :
```
{
    "_links": {
               "href": "http://localhost:8080/events/{idOfEvent}"
               }
}
```
to leave this element only.

To delete just one relation you have to put all the other link with PUT back in...

Rest will follow soon! <3

