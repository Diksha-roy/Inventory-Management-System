
package com.example.javaapi.controller;

import com.example.javaapi.model.EnvironmentEntity;
import com.example.javaapi.model.ServerEntity;
import com.example.javaapi.repository.EnvironmentRepository;
import com.example.javaapi.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/environment")
public class EnvironmentController {

    @Autowired private EnvironmentRepository environmentRepository;
    @Autowired private ServerRepository serverRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<EnvironmentEntity> createEnvironment(@RequestBody EnvironmentEntity env) {
        return ResponseEntity.ok(environmentRepository.save(env));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public ResponseEntity<List<EnvironmentEntity>> createEnvironmentBulk(@RequestBody List<EnvironmentEntity> envs) {
        return ResponseEntity.ok(environmentRepository.saveAll(envs));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public List<EnvironmentEntity> getAllEnvironments() {
        return environmentRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<EnvironmentEntity> getEnvironmentById(@PathVariable Long id) {
        return environmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<EnvironmentEntity> updateEnvironment(@PathVariable Long id, @RequestBody EnvironmentEntity updatedEnv) {
        return environmentRepository.findById(id)
                .map(env -> {
                    env.setEnvironmentName(updatedEnv.getEnvironmentName());
                    return ResponseEntity.ok(environmentRepository.save(env));
                }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEnvironment(@PathVariable Long id) {
        if (id == 1L) {
            return ResponseEntity.badRequest().body(" Cannot delete default Environment ID 1.");
        }

        Optional<EnvironmentEntity> optionalEnv = environmentRepository.findById(id);
        if (optionalEnv.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        EnvironmentEntity defaultEnv = environmentRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("⚠ Default Environment ID 1 not found"));

        List<ServerEntity> linkedServers = serverRepository.findByEnvironment_Id(id);
        linkedServers.forEach(server -> server.setEnvironment(defaultEnv));
        serverRepository.saveAll(linkedServers);

        environmentRepository.delete(optionalEnv.get());

        return ResponseEntity.ok(" Environment ID " + id + " deleted & reassigned servers to default (ID 1).");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @DeleteMapping("/bulk")
    public ResponseEntity<String> deleteEnvironmentBulk(@RequestBody List<Long> ids) {
        if (ids.contains(1L)) {
            return ResponseEntity.badRequest().body("❌ Cannot delete default Environment ID 1.");
        }

        EnvironmentEntity defaultEnv = environmentRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("⚠ Default Environment ID 1 not found"));

        List<Long> deleted = new ArrayList<>();
        List<Long> skipped = new ArrayList<>();

        for (Long id : ids) {
            Optional<EnvironmentEntity> optionalEnv = environmentRepository.findById(id);
            if (optionalEnv.isPresent()) {
                List<ServerEntity> linkedServers = serverRepository.findByEnvironment_Id(id);
                linkedServers.forEach(server -> server.setEnvironment(defaultEnv));
                serverRepository.saveAll(linkedServers);
                environmentRepository.delete(optionalEnv.get());
                deleted.add(id);
            } else {
                skipped.add(id);
            }
        }

        return ResponseEntity.ok(" Deleted: " + deleted + (skipped.isEmpty() ? "" : "  Skipped: " + skipped));
    }
}
