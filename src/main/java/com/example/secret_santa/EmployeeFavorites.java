package com.example.secret_santa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "employee_favorites")
public class EmployeeFavorites {
 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 @OneToOne
 @JoinColumn(name = "employee_id")
 private Employee employee;

 private String fav1;
 private String fav2;
 private String fav3;
 private String fav4;
 private String fav5;

 // getters/setters
}