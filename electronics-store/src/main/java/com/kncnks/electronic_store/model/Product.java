package com.kncnks.electronic_store.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "products")
public record Product(
        @Id
        String id,
        String title,
        String description,
        String category,
        String brand,
        Integer ram,
        String type,
        Double screen,
        Integer storage,
        Integer charger,
        BigDecimal price,
        List<String> images,
        Integer stock,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public Product {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }

    public Product withUpdatedTimestamp() {
        return new Product(
                id, title, description, category, brand, ram, type, screen,
                storage, charger, price, images, stock, createdAt, LocalDateTime.now()
        );
    }
}