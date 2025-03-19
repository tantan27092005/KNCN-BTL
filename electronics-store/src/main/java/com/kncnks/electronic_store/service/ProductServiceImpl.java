package com.kncnks.electronic_store.service;

import com.kncnks.electronic_store.exception.ResourceNotFoundException;
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
        PageRequest pageable = PageRequest.of(page - 1, limit);
        if (keyword != null && !keyword.isEmpty()) {
            return productRepository.findByKeyword(keyword, pageable);
        }
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> getProductsByCategory(
            String category, String brand, String ram, String type, Double screen,
            String storage, Integer charger, BigDecimal price, String pricerange,
            int page, int limit) {

        PageRequest pageable = PageRequest.of(page - 1, limit);
        BigDecimal minPrice = BigDecimal.ZERO;
        BigDecimal maxPrice = new BigDecimal("999999999");

        if (pricerange != null) {
            String[] prices = pricerange.split("-");
            if (prices.length == 2) {
                minPrice = new BigDecimal(prices[0]);
                maxPrice = new BigDecimal(prices[1]);
            }
        }

        return productRepository.findByCategoryWithFilters(
                category,
                brand != null ? brand : "",
                ram != null ? ram : "",
                type != null ? type : "",
                screen != null ? screen : 0.0,
                storage != null ? storage : "",
                charger != null ? charger : 0,
                minPrice,
                maxPrice,
                pageable
        );
    }

    @Override
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(String id, Product updatedProduct) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setTitle(updatedProduct.getTitle());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setBrand(updatedProduct.getBrand());
            existingProduct.setRam(updatedProduct.getRam());
            existingProduct.setType(updatedProduct.getType());
            existingProduct.setScreen(updatedProduct.getScreen());
            existingProduct.setStorage(updatedProduct.getStorage());
            existingProduct.setCharger(updatedProduct.getCharger());
            return productRepository.save(existingProduct);
        }).orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}