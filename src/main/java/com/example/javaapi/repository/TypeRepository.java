
package com.example.javaapi.repository;

import com.example.javaapi.model.TypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TypeRepository extends JpaRepository<TypeEntity, Long> {
    
}
