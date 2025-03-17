package com.kncnks.electronic_store.service;
import com.kncnks.electronic_store.model.Product;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Optional;

public interface ProductService {
    Page<Product> getAllProducts(String keyword, int page, int limit);

    Page<Product> getProductsByCategory(
            String category,
            String brand,
            Integer ram,
            String type,
            Double screen,
            Integer storage,
            Integer charger,
            BigDecimal price,
            String priceRange,
            int page,
            int limit);

    Optional<Product> getProductById(String id);
}