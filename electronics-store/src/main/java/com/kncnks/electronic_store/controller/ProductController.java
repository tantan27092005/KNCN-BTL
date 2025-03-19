package com.kncnks.electronic_store.controller;

import com.kncnks.electronic_store.model.Product;
import com.kncnks.electronic_store.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kncnks.electronic_store.exception.ResourceNotFoundException;


import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/products")
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
            @RequestParam(required = false) String ram,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double screen,
            @RequestParam(required = false) String storage,
            @RequestParam(required = false) Integer charger,
            @RequestParam(required = false) BigDecimal price,
            @RequestParam(required = false) String pricerange,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {

        Page<Product> productPage;

        if (category != null && !category.isEmpty()) {
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

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable("id") String id,
            @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProduct(@PathVariable("id") String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
    }
}
