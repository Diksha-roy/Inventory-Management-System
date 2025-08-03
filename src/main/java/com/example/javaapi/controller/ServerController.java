

// package com.example.javaapi.controller;

// import com.example.javaapi.dto.ServerDTO;
// import com.example.javaapi.exception.ResourceNotFoundException;
// import com.example.javaapi.model.*;
// import com.example.javaapi.repository.*;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.transaction.annotation.Transactional;
// import org.springframework.web.bind.annotation.*;

// import java.util.ArrayList;
// import java.util.List;

// @RestController
// @RequestMapping("/api/server")
// public class ServerController {

//     @Autowired private ServerRepository serverRepository;
//     @Autowired private LocationRepository locationRepository;
//     @Autowired private OSRepository osRepository;
//     @Autowired private TypeRepository typeRepository;
//     @Autowired private CategoryRepository categoryRepository;
//     @Autowired private EnvironmentRepository environmentRepository;

//     @PreAuthorize("hasRole('ADMIN')")
//     @PostMapping
//     public ResponseEntity<?> createServer(@RequestBody ServerDTO dto) {
//         ServerEntity server = mapDtoToEntity(dto);
//         return ResponseEntity.ok(serverRepository.save(server));
//     }

//     @PreAuthorize("hasRole('ADMIN')")
//     @PostMapping("/bulk")
//     public ResponseEntity<?> createServersBulk(@RequestBody List<ServerDTO> serverDTOList) {
//         List<ServerEntity> servers = new ArrayList<>();
//         for (ServerDTO dto : serverDTOList) {
//             servers.add(mapDtoToEntity(dto));
//         }
//         return ResponseEntity.ok(serverRepository.saveAll(servers));
//     }

//     @PreAuthorize("hasAnyRole('ADMIN','USER')")
//     @GetMapping
//     public List<ServerEntity> getAllServers() {
//         return serverRepository.findAll();
//     }
//     @PreAuthorize("hasAnyRole('ADMIN','USER')")
//     @GetMapping("/{id}")
//     public ResponseEntity<ServerEntity> getServerById(@PathVariable Long id) {
//         return serverRepository.findById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

    
//     @PreAuthorize("hasRole('ADMIN')")
//     @PutMapping("/{id}")
//     public ResponseEntity<?> updateServer(@PathVariable Long id, @RequestBody ServerDTO dto) {
//         return serverRepository.findById(id)
//                 .map(existing -> {
//                     ServerEntity updated = mapDtoToEntity(dto);
//                     updated.setId(existing.getId());
//                     return ResponseEntity.ok(serverRepository.save(updated));
//                 })
//                 .orElseThrow(() -> new ResourceNotFoundException("Server ID " + id + " not found"));
//     }

//     @PreAuthorize("hasRole('ADMIN')")
//     @DeleteMapping("/{id}")
//     public ResponseEntity<?> deleteServer(@PathVariable Long id) {
//         try {
//             return serverRepository.findById(id)
//                     .map(server -> {
//                         serverRepository.delete(server);
//                         return ResponseEntity.ok("Deleted server with ID: " + id);
//                     })
//                     .orElseThrow(() -> new ResourceNotFoundException("Server ID " + id + " not found"));
//         } catch (org.springframework.dao.DataIntegrityViolationException ex) {
//             return ResponseEntity.badRequest().body("Cannot delete Server ID " + id + " because it is linked with other records.");
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().body("Unexpected error: " + e.getMessage());
//         }
//     }

//     @PreAuthorize("hasRole('ADMIN')")
//     @Transactional
//     @DeleteMapping("/bulk")
//     public ResponseEntity<?> deleteServersBulk(@RequestBody List<Long> ids) {
//         List<Long> deleted = new ArrayList<>();
//         List<Long> skipped = new ArrayList<>();

//         for (Long id : ids) {
//             try {
//                 serverRepository.findById(id).ifPresentOrElse(
//                     server -> {
//                         serverRepository.delete(server);
//                         deleted.add(id);
//                     },
//                     () -> skipped.add(id)
//                 );
//             } catch (org.springframework.dao.DataIntegrityViolationException e) {
//                 skipped.add(id);
//             }
//         }

//         return ResponseEntity.ok("Deleted: " + deleted + " Skipped/Not Found: " + skipped);
//     }

//     @PreAuthorize("hasAnyRole('ADMIN','USER')")
//     @GetMapping("/os/{osId}")
//     public List<ServerEntity> getServersByOsId(@PathVariable Long osId) {
//         return serverRepository.findByOs_OsId(osId);
//     }

//     private ServerEntity mapDtoToEntity(ServerDTO dto) {
//         ServerEntity server = new ServerEntity();
//         server.setServerName(dto.getServerName());
//         server.setServerCpu(dto.getServerCpu().intValue());
//         server.setServerMemoryInGb(dto.getServerMemoryInGb().intValue());
//         server.setPeakCpuUsage(String.valueOf(dto.getPeakCpuUsage()));
//         server.setPeakMemoryUsage(String.valueOf(dto.getPeakMemoryUsage()));

//         server.setLocation(locationRepository.findById(dto.getLocationId())
//                 .orElseThrow(() -> new ResourceNotFoundException("Location ID " + dto.getLocationId() + " does not exist")));

//         server.setOs(osRepository.findById(dto.getOsId())
//                 .orElseThrow(() -> new ResourceNotFoundException("OS ID " + dto.getOsId() + " does not exist")));

//         server.setType(typeRepository.findById(dto.getTypeId())
//                 .orElseThrow(() -> new ResourceNotFoundException("Type ID " + dto.getTypeId() + " does not exist")));

//         server.setCategory(categoryRepository.findById(dto.getCategoryId())
//                 .orElseThrow(() -> new ResourceNotFoundException("Category ID " + dto.getCategoryId() + " does not exist")));

//         if (dto.getEnvironmentId() != null) {
//             server.setEnvironment(environmentRepository.findById(dto.getEnvironmentId())
//                     .orElseThrow(() -> new ResourceNotFoundException("Environment ID " + dto.getEnvironmentId() + " does not exist")));
//         }

//         return server;
//     }
// }



package com.example.javaapi.controller;

import com.example.javaapi.dto.ServerDTO;
import com.example.javaapi.exception.ResourceNotFoundException;
import com.example.javaapi.model.*;
import com.example.javaapi.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/server")
public class ServerController {

    @Autowired private ServerRepository serverRepository;
    @Autowired private LocationRepository locationRepository;
    @Autowired private OSRepository osRepository;
    @Autowired private TypeRepository typeRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private EnvironmentRepository environmentRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createServer(@RequestBody ServerDTO dto) {
        ServerEntity server = mapDtoToEntity(dto);
        return ResponseEntity.ok(serverRepository.save(server));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/bulk")
    public ResponseEntity<?> createServersBulk(@RequestBody List<ServerDTO> serverDTOList) {
        List<ServerEntity> servers = new ArrayList<>();
        for (ServerDTO dto : serverDTOList) {
            servers.add(mapDtoToEntity(dto));
        }
        return ResponseEntity.ok(serverRepository.saveAll(servers));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public List<ServerEntity> getAllServers() {
        return serverRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public ResponseEntity<ServerEntity> getServerById(@PathVariable Long id) {
        return serverRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateServer(@PathVariable Long id, @RequestBody ServerDTO dto) {
        return serverRepository.findById(id)
                .map(existing -> {
                    ServerEntity updated = mapDtoToEntity(dto);
                    updated.setId(existing.getId());
                    return ResponseEntity.ok(serverRepository.save(updated));
                })
                .orElseThrow(() -> new ResourceNotFoundException("Server ID " + id + " not found"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteServer(@PathVariable Long id) {
        try {
            return serverRepository.findById(id)
                    .map(server -> {
                        serverRepository.delete(server);
                        return ResponseEntity.ok("Deleted server with ID: " + id);
                    })
                    .orElseThrow(() -> new ResourceNotFoundException("Server ID " + id + " not found"));
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            return ResponseEntity.badRequest().body("Cannot delete Server ID " + id + " because it is linked with other records.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Unexpected error: " + e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    @DeleteMapping("/bulk")
    public ResponseEntity<?> deleteServersBulk(@RequestBody List<Long> ids) {
        List<Long> deleted = new ArrayList<>();
        List<Long> skipped = new ArrayList<>();

        for (Long id : ids) {
            try {
                serverRepository.findById(id).ifPresentOrElse(
                    server -> {
                        serverRepository.delete(server);
                        deleted.add(id);
                    },
                    () -> skipped.add(id)
                );
            } catch (org.springframework.dao.DataIntegrityViolationException e) {
                skipped.add(id);
            }
        }

        return ResponseEntity.ok("Deleted: " + deleted + " Skipped/Not Found: " + skipped);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/os/{osId}")
    public List<ServerEntity> getServersByOsId(@PathVariable Long osId) {
        return serverRepository.findByOs_OsId(osId);
    }

    private ServerEntity mapDtoToEntity(ServerDTO dto) {
        ServerEntity server = new ServerEntity();
        server.setServerName(dto.getServerName());
        server.setServerCpu(dto.getServerCpu().intValue());
        server.setServerMemoryInGb(dto.getServerMemoryInGb().intValue());
        server.setPeakCpuUsage(String.valueOf(dto.getPeakCpuUsage()));
        server.setPeakMemoryUsage(String.valueOf(dto.getPeakMemoryUsage()));

        server.setLocation(locationRepository.findById(dto.getLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Location ID " + dto.getLocationId() + " does not exist")));

        server.setOs(osRepository.findById(dto.getOsId())
                .orElseThrow(() -> new ResourceNotFoundException("OS ID " + dto.getOsId() + " does not exist")));

        server.setType(typeRepository.findById(dto.getTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Type ID " + dto.getTypeId() + " does not exist")));

        server.setCategory(categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category ID " + dto.getCategoryId() + " does not exist")));

        if (dto.getEnvironmentId() != null) {
            server.setEnvironment(environmentRepository.findById(dto.getEnvironmentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Environment ID " + dto.getEnvironmentId() + " does not exist")));
        }

        return server;
    }
}
