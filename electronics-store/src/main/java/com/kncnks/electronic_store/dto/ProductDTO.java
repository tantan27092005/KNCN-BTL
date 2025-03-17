package com.kncnks.electronics_store.dto;

import java.math.BigDecimal;
import java.util.List;

// DTO sử dụng record (Java 16+)
public record ProductDTO(
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
        Integer stock
) {}
