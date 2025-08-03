
package com.example.javaapi.controller;

import com.example.javaapi.model.LocationEntity;
import com.example.javaapi.model.ServerEntity;
import com.example.javaapi.repository.LocationRepository;
import com.example.javaapi.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired private LocationRepository locationRepository;
    @Autowired private ServerRepository serverRepository;

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<LocationEntity>> getAllLocations() {
        return ResponseEntity.ok(locationRepository.findAll());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<LocationEntity> getLocationById(@PathVariable Long id) {
        return locationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<LocationEntity> createLocation(@RequestBody LocationEntity location) {
        return ResponseEntity.ok(locationRepository.save(location));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public ResponseEntity<?> createLocationsBulk(@RequestBody List<LocationEntity> locations) {
        if (locations == null || locations.size() < 5) {
            return ResponseEntity.badRequest().body("At least 5 records required for bulk upload.");
        }
        return ResponseEntity.ok(locationRepository.saveAll(locations));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<LocationEntity> updateLocation(@PathVariable Long id, @RequestBody LocationEntity details) {
        return locationRepository.findById(id).map(location -> {
            location.setLocationName(details.getLocationName());
            location.setLocationCity(details.getLocationCity());
            return ResponseEntity.ok(locationRepository.save(location));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable Long id) {
        if (id == 1L) {
            return ResponseEntity.badRequest().body("Default location ID 1 cannot be deleted.");
        }

        return locationRepository.findById(id).map(location -> {
            LocationEntity defaultLocation = locationRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("⚠ Default location (ID = 1) not found."));

            List<ServerEntity> servers = serverRepository.findByLocation_Id(id);
            servers.forEach(server -> server.setLocation(defaultLocation));
            serverRepository.saveAll(servers);

            locationRepository.delete(location);
            return ResponseEntity.ok("Deleted Location ID " + id + " & reassigned " + servers.size() + " server(s).");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/bulk")
    public ResponseEntity<String> deleteLocationsBulk(@RequestBody List<Long> ids) {
        if (ids.contains(1L)) {
            return ResponseEntity.badRequest().body("Default location ID 1 cannot be deleted.");
        }

        List<LocationEntity> locationsToDelete = locationRepository.findAllById(ids);
        if (locationsToDelete.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        LocationEntity defaultLocation = locationRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("⚠ Default location (ID = 1) not found."));

        for (Long id : ids) {
            List<ServerEntity> servers = serverRepository.findByLocation_Id(id);
            servers.forEach(server -> server.setLocation(defaultLocation));
            serverRepository.saveAll(servers);
        }

        locationRepository.deleteAll(locationsToDelete);
        return ResponseEntity.ok("Deleted location IDs: " + ids + " & reassigned servers to default (ID 1).");
    }
}
