package com.pcwebservice.model;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Leo on 05.11.2016.
 */

@RepositoryRestResource(collectionResourceRel = "crawlers", path = "crawlers")
public interface CrawlerRepository extends PagingAndSortingRepository<Crawler, Long> {

}
