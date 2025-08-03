
package com.example.javaapi.dto;

import lombok.Data;

@Data
public class ServerDTO {
    private String serverName;
    private Integer serverCpu;
    private Integer serverMemoryInGb;
    private String peakMemoryUsage;
    private String peakCpuUsage;

    private Long locationId;
    private Long osId;
    private Long typeId;
    private Long categoryId;
    private Long environmentId;

    @Data
    public static class ServerResponseDTO {
        private Long id;
        private String serverName;
        private int serverCpu;
        private int serverMemoryInGb;
        private String peakMemoryUsage;
        private String peakCpuUsage;

        private String locationName;
        private String osName;
        private String typeName;
        private String categoryName;
        private String environmentName;
    }
}
