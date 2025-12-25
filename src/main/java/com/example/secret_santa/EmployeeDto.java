package com.example.secret_santa;

import java.util.List;

import lombok.Data;

//EmployeeDto.java
@Data
public class EmployeeDto {
private Long id;
private String name;
private List<String> favorites;
// getters/setters
}
