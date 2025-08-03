package com.example.javaapi.repository;

import com.example.javaapi.model.EnvironmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnvironmentRepository extends JpaRepository<EnvironmentEntity, Long> {
}
