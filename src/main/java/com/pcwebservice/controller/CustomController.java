package com.pcwebservice.controller;

import com.pcwebservice.model.CrawlerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by Leo on 01.12.2016.
 */

@RestController
@EnableOAuth2Sso
public class CustomController {

    @Autowired
    CrawlerRepository crawlerRepository;

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

    @RequestMapping(value = "/hello", produces = "text/plain")
    public String crawler() {
        return crawlerRepository.findTitleById(1L);
    }


 /*   @RequestMapping("/googleRedirect")
    public String token(@RequestParam String code) throws IOException {
        GoogleTokenResponse tokenResponse =
                new GoogleAuthorizationCodeTokenRequest(
                        new NetHttpTransport(),
                        JacksonFactory.getDefaultInstance(),
                        "https://www.googleapis.com/oauth2/v4/token",
                        "649804390923-7mov7q7g42kbod1do8ikvhtgdu0m58ai.apps.googleusercontent.com",
                        "3zRUO4fOIBwLlIU8VntClGB6",
                        code,
                        "https://localhost:8443/googleRedirect")
                        .execute();

        String accessToken = tokenResponse.getAccessToken();
        System.out.println(accessToken);

        // Use access token to call API
        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
        System.out.println(credential.toString());

        // Get profile info from ID token
        GoogleIdToken idToken = tokenResponse.parseIdToken();
        GoogleIdToken.Payload payload = idToken.getPayload();
        System.out.println(payload.toPrettyString());
        String userId = payload.getSubject();  // Use this value as a key to identify a user.
        String email = payload.getEmail();
        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        String locale = (String) payload.get("locale");
        String familyName = (String) payload.get("family_name");
        String givenName = (String) payload.get("given_name");
        return userId;
    }*/



/*    @RequestMapping(value = "/image/crawler/{id}", method = RequestMethod.POST)
    public void setImage(@PathVariable Long id, @RequestBody String body) {
        byte[] bytesEncoded = Base64.getEncoder().encode(body.getBytes());
        crawlerRepository.findByid(id).setUserImage(bytesEncoded);
        crawlerRepository.save(crawlerRepository.findByid(id));
    }

    @RequestMapping(value = "/image/crawler/{id}", method = RequestMethod.GET, produces = "text/plain")
    public String getImage(@PathVariable Long id) {
        return new String(Base64.getDecoder().decode(crawlerRepository.findByid(id).getUserImage()));
    }*/

}