package com.kncnks.electronics_store.service;

import com.kncnks.electronic_store.model.Product;
import com.kncnks.electronics_store.repository.Pr   oductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

        // Pattern matching with switch (Java 21)
        return switch (keyword) {
            case null, "" -> productRepository.findAll(pageable);
            default -> productRepository.findByKeyword(keyword, pageable);
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

        // Text blocks (Java 15+) và string templates (Java 21 preview)
        String brandFilter = brand != null && !brand.isEmpty() ?
                STR."""{"brand": "\{brand}"}""" : "{}";

        String ramFilter = ram != null ?
                STR."""{"ram": \{ram}}""" : "{}";

        String typeFilter = type != null && !type.isEmpty() ?
                STR."""{"type": "\{type}"}""" : "{}";

        String screenFilter = screen != null ?
                STR."""{"screen": \{screen}}""" : "{}";

        String storageFilter = storage != null ?
                STR."""{"storage": \{storage}}""" : "{}";

        String chargerFilter = charger != null ?
                STR."""{"charger": \{charger}}""" : "{}";

        // Xử lý khoảng giá
        String priceFilter = "{}";
        if (price != null) {
            priceFilter = STR."""{"price": \{price}}""";
        } else if (priceRange != null && !priceRange.isEmpty()) {
            var range = priceRange.split("-");
            if (range.length == 2) {
                try {
                    var min = new BigDecimal(range[0]);
                    var max = new BigDecimal(range[1]);
                    priceFilter = STR."""{"price": {"$gte": \{min}, "$lte": \{max}}}""";
                } catch (NumberFormatException e) {
                    // Định dạng khoảng giá không hợp lệ, sử dụng mặc định
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