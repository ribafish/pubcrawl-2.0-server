package com.pcwebservice.model;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.scheduling.annotation.Async;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Future;

/**
 * Created by Leo on 05.11.2016.
 */

@RepositoryRestResource(collectionResourceRel = "crawlers", path = "crawlers")
public interface CrawlerRepository extends PagingAndSortingRepository<Crawler, Long> {
    //List<Crawler> findByuserName2(@Param("userName") String userName);
    Crawler findByuserName(@Param("userName") String userName);
    ArrayList <Crawler> findByTitleIs ();

    @Query("SELECT t.userName FROM Crawler t where t.id = :id")
    String findTitleById(@Param("id") Long id);
}
