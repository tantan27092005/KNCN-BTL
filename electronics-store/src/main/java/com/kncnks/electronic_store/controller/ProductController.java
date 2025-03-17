package com.kncnks.electronic_store.controller;

import com.kncnks.electronic_store.exception.ResourceNotFoundException;
import com.kncnks.electronic_store.model.Product;
import com.kncnks.electronic_store.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/posts")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer ram,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double screen,
            @RequestParam(required = false) Integer storage,
            @RequestParam(required = false) Integer charger,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) String pricerange,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        Page<Product> productPage;

        // Pattern matching for instanceof (Java 16+)
        if (category instanceof String c && !c.isEmpty()) {
            // Tìm kiếm theo category với các bộ lọc
            productPage = productService.getProductsByCategory(
                    category, brand, ram, type, screen, storage, charger, price, pricerange, page, limit);
        } else {
            productPage = productService.getAllProducts(keyword, page, limit);
        }

        return ResponseEntity.ok(Map.of(
                "products", productPage.getContent(),
                "currentPage", productPage.getNumber() + 1,
                "totalItems", productPage.getTotalElements(),
                "totalPages", productPage.getTotalPages()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") String id) {
        return ResponseEntity.ok(
                productService.getProductById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id))
        );
    }
}