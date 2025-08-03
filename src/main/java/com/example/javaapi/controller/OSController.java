
package com.example.javaapi.controller;

import com.example.javaapi.model.OSEntity;
import com.example.javaapi.repository.OSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/os")
public class OSController {

    @Autowired private OSRepository osRepository;

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public List<OSEntity> getAllOS() {
        return osRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<OSEntity> getOSById(@PathVariable Long id) {
        return osRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public OSEntity createOS(@RequestBody OSEntity os) {
        return osRepository.save(os);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<OSEntity> updateOS(@PathVariable Long id, @RequestBody OSEntity osDetails) {
        return osRepository.findById(id).map(os -> {
            os.setOsName(osDetails.getOsName());
            os.setOsVersion(osDetails.getOsVersion());
            return ResponseEntity.ok(osRepository.save(os));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOS(@PathVariable Long id) {
        try {
            osRepository.deleteById(id);
            return ResponseEntity.ok("Deleted OS with id: " + id);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Cannot delete OS with id " + id + " → " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping
    public ResponseEntity<String> deleteMultipleOS(@RequestBody List<Long> ids) {
        try {
            osRepository.deleteAllById(ids);
            return ResponseEntity.ok("Deleted OS entries with ids: " + ids);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error while deleting OS entries → " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public ResponseEntity<?> uploadMultipleOS(@RequestBody List<OSEntity> osList) {
        if (osList == null || osList.size() < 5) {
            return ResponseEntity.badRequest().body("Minimum 5 OS records required for bulk upload.");
        }

        try {
            List<OSEntity> saved = osRepository.saveAll(osList);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error during bulk upload → " + e.getMessage());
        }
    }
}
