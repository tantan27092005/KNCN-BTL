package com.kncnks.electronic_store.service;

import com.kncnks.electronic_store.model.Product;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Optional;

public interface ProductService {
    Page<Product> getAllProducts(String keyword, int page, int limit);

    Page<Product> getProductsByCategory(
            String category, String brand, String ram, String type, Double screen,
            String storage, Integer charger, BigDecimal price, String pricerange,
            int page, int limit);

    Optional<Product> getProductById(String id);

    Product createProduct(Product product);

    Product updateProduct(String id, Product product);

    void deleteProduct(String id);
}