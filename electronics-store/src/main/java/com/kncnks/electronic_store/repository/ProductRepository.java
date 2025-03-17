package com.kncnks.electronics_store.repository;

import com.kncnks.electronic_store.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.math.BigDecimal;

public interface ProductRepository extends MongoRepository<Product, String> {

    // Text blocks (Java 15+) cho query phức tạp
    @Query("""
        {'category': ?0, 
         $and: [
           ?1, 
           ?2, 
           ?3, 
           ?4, 
           ?5, 
           ?6, 
           ?7
         ]}
    """)
    Page<Product> findByCategoryWithFilters(
            String category,
            String brandFilter,
            String ramFilter,
            String typeFilter,
            String screenFilter,
            String storageFilter,
            String chargerFilter,
            String priceFilter,
            Pageable pageable);

    // Text blocks cho query tìm kiếm keyword
    @Query("""
        {'$or': [
           {'title': {$regex: ?0, $options: 'i'}}, 
           {'description': {$regex: ?0, $options: 'i'}}, 
           {'brand': {$regex: ?0, $options: 'i'}}, 
           {'category': {$regex: ?0, $options: 'i'}}
         ]}
    """)
    Page<Product> findByKeyword(String keyword, Pageable pageable);

    Page<Product> findByCategory(String category, Pageable pageable);

    Page<Product> findByCategoryAndBrand(String category, String brand, Pageable pageable);

    Page<Product> findByCategoryAndPriceBetween(
            String category, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
}