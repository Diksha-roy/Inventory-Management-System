
package com.example.javaapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "os")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class OSEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "os_id")
    private Long osId;

    @Column(name = "os_name", nullable = false)
    private String osName;

    @Column(name = "os_version", nullable = false)
    private String osVersion;

    @OneToMany(mappedBy = "os", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ServerEntity> servers;
}
