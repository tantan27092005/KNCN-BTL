package com.kncnks.electronic_store.repository;

import com.kncnks.electronic_store.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.math.BigDecimal;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query("""
        {
            "$or": [
                {"title": {"$regex": ?0, "$options": "i"}},
                {"description": {"$regex": ?0, "$options": "i"}},
                {"brand": {"$regex": ?0, "$options": "i"}},
                {"category": {"$regex": ?0, "$options": "i"}}
            ]
        }
    """)
    Page<Product> findByKeyword(String keyword, Pageable pageable);

    Page<Product> findByCategory(String category, Pageable pageable);

    Page<Product> findByCategoryAndBrand(String category, String brand, Pageable pageable);

    @Query("""
        {
            "category": ?0,
            "price": { "$gte": ?1, "$lte": ?2 }
        }
    """)
    Page<Product> findByCategoryAndPriceBetween(
            String category, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

    @Query("""
        {
            "category": ?0,
            "brand": { "$regex": ?1, "$options": "i" },
            "ram": { "$regex": ?2, "$options": "i" },
            "type": { "$regex": ?3, "$options": "i" },
            "screen": { "$gte": ?4 },
            "storage": { "$regex": ?5, "$options": "i" },
            "charger": { "$gte": ?6 },
            "price": { "$gte": ?7, "$lte": ?8 }
        }
    """)
    Page<Product> findByCategoryWithFilters(
            String category,
            String brand,
            String ram,
            String type,
            Double screen,
            String storage,
            Integer charger,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable
    );
}
