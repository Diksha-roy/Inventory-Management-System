
package com.example.javaapi.controller;

import com.example.javaapi.model.TypeEntity;
import com.example.javaapi.model.ServerEntity;
import com.example.javaapi.repository.TypeRepository;
import com.example.javaapi.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/type")
public class TypeController {

    @Autowired private TypeRepository typeRepository;
    @Autowired private ServerRepository serverRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TypeEntity> createType(@RequestBody TypeEntity type) {
        return ResponseEntity.ok(typeRepository.save(type));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public ResponseEntity<?> createTypesBulk(@RequestBody List<TypeEntity> types) {
        if (types == null || types.size() < 5) {
            return ResponseEntity.badRequest().body("Minimum 5 Type records required for bulk upload.");
        }
        return ResponseEntity.ok(typeRepository.saveAll(types));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<TypeEntity>> getAllTypes() {
        return ResponseEntity.ok(typeRepository.findAll());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<TypeEntity> getTypeById(@PathVariable Long id) {
        return typeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<TypeEntity> updateType(@PathVariable Long id, @RequestBody TypeEntity updatedType) {
        return typeRepository.findById(id).map(type -> {
            type.setTypeName(updatedType.getTypeName());
            return ResponseEntity.ok(typeRepository.save(type));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteType(@PathVariable Long id) {
        List<ServerEntity> servers = serverRepository.findByType_Id(id);
        if (!servers.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Cannot delete Type ID " + id + " — It is used by " + servers.size() + " server(s).");
        }

        return typeRepository.findById(id).map(type -> {
            typeRepository.delete(type);
            return ResponseEntity.ok("Deleted Type ID: " + id);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/bulk")
    public ResponseEntity<String> deleteTypesBulk(@RequestBody List<Long> ids) {
        for (Long id : ids) {
            List<ServerEntity> servers = serverRepository.findByType_Id(id);
            if (!servers.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Cannot delete Type ID " + id + " — It is used by " + servers.size() + " server(s).");
            }
        }

        List<TypeEntity> toDelete = typeRepository.findAllById(ids);
        typeRepository.deleteAll(toDelete);
        return ResponseEntity.ok("Deleted Type IDs: " + ids);
    }
}



