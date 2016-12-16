## Crawler REST APi
Rootlink:
```
Host/crawlers/
```

Single element Link
```
Host/crawlers/{idOfCrawler}
```
Response:
```
{
  "userName": String,
  "email": String,
  "description": String,
  "userImage": Byte,
  "_links": {
    "self": {
      "href": "http://localhost:8080/crawlers/{idOfCrawler}"
    },
    "crawler": {
      "href": "http://localhost:8080/crawlers/{idOfCrawler}"
    },
    "friendsList": {
      "href": "http://localhost:8080/crawlers/{idOfCrawler}/friendsList"
    },
    "ownPubs": {
      "href": "http://localhost:8080/crawlers/{idOfCrawler}/ownPubs"
    },
    "favourites": {
      "href": "http://localhost:8080/crawlers/{idOfCrawler}/favourites"
    },
    "ownEvents": {
      "href": "http://localhost:8080/crawlers/{idOfCrawler}/ownEvents"
    },
    "eventsList": {
      "href": "http://localhost:8080/crawlers/{idOfCrawler}/eventsList"
    }
  }
}
```
#### Image
The Image will be saved in an array of bytes but the EndPoint is a String BASE64 endpoint so the frontend has to decode/encode the images.

### CREATING
While developement is ongoing there are no required fields except userName.

So POST may be:
```
Host/crawlers/
```
```
{
  "userName": "Kim"
}
```
An ID will be generated but more Properties can be added and set.

### UPDATING

Properties can be changed with PATCH :
```
Host/crawlers/{idOfCrawler}
```
```
{
  "userImage": null
}
```
# Links
self : returns a href to the current model
crawler : returns a href to the current model
```
"self": {
            "href": "http://localhost:8080/crawlers/{idOfCrawler}"
          },
"crawler": {
            "href": "http://localhost:8080/crawlers/{idOfCrawler}"
          }
```

#### friendsList : returns a href to a List of Crawlers 
> list of crawlers who are set as friends

To add a crawler to the friendsList a crawler link must be sent (important the crawler needs to exist!): PATCH
```
Host/crawlers/{idOfCrawler}/friendsList
```
```
{
    "_links": {
               "href": "http://localhost:8080/crawlers/{idOfCrawler}"
               }
}
```

#### eventsList : returns a href to a List of Events 
> all the events the crawler joined

To add an event to eventsList an event link must be sent: PATCH
```
Host/crawlers/{idOfCrawler}/eventsList
```
```
{
    "_links": {
               "href": "http://localhost:8080/events/{idOfEvent}"
               }
}
```

#### ownPubs : returns a href to a List of Pubs 
> a list of all pubs the crawler where the crawler is the owner

To add a pub to the ownPubs the pub has to add the crawler to in his pubOwner field

##### see pub API


#### favourites : returns a href to a List of Pubs 
> a list of favourite pubs

To add a pub to the favourites the pub has to add the crawler to his topsList
See Pub APi

#### ownEvents : returns a href to a List of Events 
> all the events the crawler created

To add an event to ownEvents a crawler must be set as eventOwner in an event
See Event APi

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
               "href": "http://localhost:8080/events/{idOfEvent}"
               }
}
```
to leave this element only.

To delete just one relation you have to put all the other link with PUT back in...

Rest will follow soon! <3

