package com.pcwebservice.model;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by Leo on 05.11.2016.
 */

@RepositoryRestResource(collectionResourceRel = "crawlers", path = "crawlers")
public interface CrawlerRepository extends PagingAndSortingRepository<Crawler, Long> {
    //List<Crawler> findByuserName2(@Param("userName") String userName);
    Crawler findByuserName(@Param("userName") String userName);
}
