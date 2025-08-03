
package com.example.javaapi.repository;

import com.example.javaapi.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    
    Optional<UserEntity> findByUsername(String username);

    
    boolean existsByUsername(String username);
}
