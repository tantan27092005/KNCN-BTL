package com.kncnks.electronic_store.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String title;
    private String description;
    private BigDecimal price;
    private String category;
    private String brand;
    private String ram;
    private String type;
    private Double screen;
    private String storage;
    private Integer charger;
    private String image;

    public Product() {}

    public Product(String title, String description, BigDecimal price, String category,
                   String brand, String ram, String type, Double screen,
                   String storage, Integer charger, String image) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.brand = brand;
        this.ram = ram;
        this.type = type;
        this.screen = screen;
        this.storage = storage;
        this.charger = charger;
        this.image = image;
    }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getRam() { return ram; }
    public void setRam(String ram) { this.ram = ram; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getScreen() { return screen; }
    public void setScreen(Double screen) { this.screen = screen; }

    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }

    public Integer getCharger() { return charger; }
    public void setCharger(Integer charger) { this.charger = charger; }
}