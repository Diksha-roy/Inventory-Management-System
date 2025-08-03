
package com.example.javaapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "environment")
@Getter
@Setter
@JsonIgnoreProperties({"servers", "hibernateLazyInitializer", "handler"})
public class EnvironmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "environment_id")
    private Long Id;

    private String environmentName;

    @OneToMany(mappedBy = "environment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("environment")
    private List<ServerEntity> servers;
}
