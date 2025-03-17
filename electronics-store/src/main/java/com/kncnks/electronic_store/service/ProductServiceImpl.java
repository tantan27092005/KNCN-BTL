package com.kncnks.electronic_store.service;

import com.kncnks.electronic_store.model.Product;
import com.kncnks.electronic_store.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<Product> getAllProducts(String keyword, int page, int limit) {
        var pageable = PageRequest.of(page - 1, limit);

        return switch (keyword) {
            case null -> productRepository.findAll(pageable);   // Khi keyword là null
            case "" -> productRepository.findAll(pageable);     // Khi keyword là chuỗi rỗng
            default -> productRepository.findByKeyword(keyword, pageable); // Các trường hợp khác
        };
    }

    @Override
    public Page<Product> getProductsByCategory(
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
            int limit) {

        var pageable = PageRequest.of(page - 1, limit);
        String brandFilter = brand != null && !brand.isEmpty() ?
                "{\"brand\": \"" + brand + "\"}" : "{}";

        String ramFilter = ram != null ?
                "{\"ram\": " + ram + "}" : "{}";

        String typeFilter = type != null && !type.isEmpty() ?
                "{\"type\": \"" + type + "\"}" : "{}";

        String screenFilter = screen != null ?
                "{\"screen\": " + screen + "}" : "{}";

        String storageFilter = storage != null ?
                "{\"storage\": " + storage + "}" : "{}";

        String chargerFilter = charger != null ?
                "{\"charger\": " + charger + "}" : "{}";

        String priceFilter = "{}";
        if (price != null) {
            priceFilter = "{\"price\": " + price + "}";
        } else if (priceRange != null && !priceRange.isEmpty()) {
            var range = priceRange.split("-");
            if (range.length == 2) {
                try {
                    var min = new BigDecimal(range[0]);
                    var max = new BigDecimal(range[1]);
                    priceFilter = "{\"price\": {\"$gte\": " + min + ", \"$lte\": " + max + "}}";
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("Invalid price range format: " + priceRange, e);
                }
            }
        }

        return productRepository.findByCategoryWithFilters(
                category,
                brandFilter,
                ramFilter,
                typeFilter,
                screenFilter,
                storageFilter,
                chargerFilter,
                priceFilter,
                pageable);
    }

    @Override
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }
}