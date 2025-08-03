
package com.example.javaapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "servers")
public class ServerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serverName;

    private Integer serverCpu;

    private Integer serverMemoryInGb;

    private String peakCpuUsage;

    private String peakMemoryUsage;

    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private LocationEntity location;

    @ManyToOne
    @JoinColumn(name = "os_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private OSEntity os;

    @ManyToOne
    @JoinColumn(name = "type_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TypeEntity type;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = "environment_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private EnvironmentEntity environment;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServerName() {
        return serverName;
    }

    public void setServerName(String serverName) {
        this.serverName = serverName;
    }

    public Integer getServerCpu() {
        return serverCpu;
    }

    public void setServerCpu(Integer serverCpu) {
        this.serverCpu = serverCpu;
    }

    public Integer getServerMemoryInGb() {
        return serverMemoryInGb;
    }

    public void setServerMemoryInGb(Integer serverMemoryInGb) {
        this.serverMemoryInGb = serverMemoryInGb;
    }

    public String getPeakCpuUsage() {
        return peakCpuUsage;
    }

    public void setPeakCpuUsage(String peakCpuUsage) {
        this.peakCpuUsage = peakCpuUsage;
    }

    public String getPeakMemoryUsage() {
        return peakMemoryUsage;
    }

    public void setPeakMemoryUsage(String peakMemoryUsage) {
        this.peakMemoryUsage = peakMemoryUsage;
    }

    public LocationEntity getLocation() {
        return location;
    }

    public void setLocation(LocationEntity location) {
        this.location = location;
    }

    public OSEntity getOs() {
        return os;
    }

    public void setOs(OSEntity os) {
        this.os = os;
    }

    public TypeEntity getType() {
        return type;
    }

    public void setType(TypeEntity type) {
        this.type = type;
    }

    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    public EnvironmentEntity getEnvironment() {
        return environment;
    }

    public void setEnvironment(EnvironmentEntity environment) {
        this.environment = environment;
    }
}
