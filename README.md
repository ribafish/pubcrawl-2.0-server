# pubracwl-2.0-server
Internet of Services Lab WS16/17 project PubCrawl 2.0 Webservice based on Spring Boot to serve REST API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Gradle (https://gradle.org/gradle-download/)
```
```
PostgreSQL (https://www.postgresql.org/download/)
```
```
Java JDK1.8
```
```
Java supporting IDE
```

### Installing

A step by step series of examples that tell you have to get a development env running

```
Install Java
```
```
Install PostgreSQL and create Database with:
- dbname :postgres
- username=postgres
- password=admin
```
```
Install Gradle
```

## Running the service

```
git clone https://github.com/ribafish/pubcrawl-2.0-server
```
```
Go to pubcrawl-2.0-server folder
```
```
./gradlew bootRun
```
```
If everything works go to localhost:8080/ and you see a small admin page to test the API 
```
```
You`ll need to login with username : user and a password : which is generated internally and you can copy it from the console output
```

## REST API

```
Main Objects: 
Crawler 
Event 
Pub
```
Create new Main :
POST http://localhost:8080/crawlers 

{
  "userName": "Username"
}

=> 

{
  "userName": "Username",
  "email": null,
  "description": null,
  "userImage": null,
  "_links": {
    "self": {
      "href": "http://localhost:8080/crawlers/19"
    },
    "crawler": {
      "href": "http://localhost:8080/crawlers/19"
    },
    "ownPubs": {
      "href": "http://localhost:8080/crawlers/19/ownPubs"
    },
    "favourites": {
      "href": "http://localhost:8080/crawlers/19/favourites"
    },
    "eventsList": {
      "href": "http://localhost:8080/crawlers/19/eventsList"
    },
    "ownEvents": {
      "href": "http://localhost:8080/crawlers/19/ownEvents"
    },
    "friendsList": {
      "href": "http://localhost:8080/crawlers/19/friendsList"
    }
  }
}


## Running the tests

Explain how to run the automated tests for this system


## Authors

* **Leo** - *Initial work* - (https://github.com/leolileo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
