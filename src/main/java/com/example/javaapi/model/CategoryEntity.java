

// package com.example.javaapi.model;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// import jakarta.persistence.*;
// import lombok.Getter;
// import lombok.Setter;

// import java.util.List;

// @Entity
// @Table(name = "category")
// @Getter
// @Setter
// public class CategoryEntity {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String categoryName;

//     @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//     @JsonIgnore 
//     private List<ServerEntity> servers;
// }



package com.example.javaapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "category")
@Getter
@Setter
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long Id;

    private String categoryName;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ServerEntity> servers;
}
