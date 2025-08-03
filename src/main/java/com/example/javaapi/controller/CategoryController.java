
package com.example.javaapi.controller;

import com.example.javaapi.model.CategoryEntity;
import com.example.javaapi.model.ServerEntity;
import com.example.javaapi.repository.CategoryRepository;
import com.example.javaapi.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired private CategoryRepository categoryRepository;
    @Autowired private ServerRepository serverRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryEntity> createCategory(@RequestBody CategoryEntity category) {
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public ResponseEntity<List<CategoryEntity>> createCategoryBulk(@RequestBody List<CategoryEntity> categories) {
        return ResponseEntity.ok(categoryRepository.saveAll(categories));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> updateCategory(@PathVariable Long id, @RequestBody CategoryEntity updatedCategory) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setCategoryName(updatedCategory.getCategoryName());
                    return ResponseEntity.ok(categoryRepository.save(category));
                }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        return deleteAndReassign(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @DeleteMapping("/bulk")
    public ResponseEntity<String> deleteCategoryBulk(@RequestBody List<Long> ids) {
        List<Long> deleted = new ArrayList<>();
        List<Long> skipped = new ArrayList<>();

        for (Long id : ids) {
            ResponseEntity<?> result = deleteAndReassign(id);
            if (result.getStatusCode().is2xxSuccessful()) {
                deleted.add(id);
            } else {
                skipped.add(id);
            }
        }

        return ResponseEntity.ok(" Deleted: " + deleted + (skipped.isEmpty() ? "" : "  Skipped: " + skipped));
    }

    private ResponseEntity<?> deleteAndReassign(Long id) {
        return categoryRepository.findById(id).map(category -> {
            if (id == 1L) {
                return ResponseEntity.badRequest().body(" Cannot delete default Category ID 1.");
            }

            CategoryEntity defaultCategory = categoryRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("⚠ Default Category ID 1 not found"));

            List<ServerEntity> servers = serverRepository.findByCategory_Id(id);
            servers.forEach(server -> server.setCategory(defaultCategory));
            serverRepository.saveAll(servers);

            categoryRepository.delete(category);

            return ResponseEntity.ok(" Category ID " + id + " deleted & reassigned to default (ID 1) for " + servers.size() + " server(s).");
        }).orElse(ResponseEntity.notFound().build());
    }
}
