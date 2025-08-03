
package com.example.javaapi.repository;

import com.example.javaapi.model.ServerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServerRepository extends JpaRepository<ServerEntity, Long> {
    List<ServerEntity> findByLocation_Id(Long locationId);     
    List<ServerEntity> findByEnvironment_Id(Long envId);       
    List<ServerEntity> findByCategory_Id(Long categoryId);     
    List<ServerEntity> findByType_Id(Long typeId);             
    List<ServerEntity> findByOs_OsId(Long osId);               
}



