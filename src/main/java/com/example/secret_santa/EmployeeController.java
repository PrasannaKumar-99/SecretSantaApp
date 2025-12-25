package com.example.secret_santa;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//EmployeeController.java
@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev URL
public class EmployeeController {

 private final EmployeeService service;

 public EmployeeController(EmployeeService service) {
     this.service = service;
 }

 @GetMapping
 public List<EmployeeDto> getAll() {
     return service.getAll();
 }

 @GetMapping("/{id}")
 public EmployeeDto getById(@PathVariable Long id) {
     return service.getById(id);
 }

 @PostMapping
 public EmployeeDto create(@RequestBody EmployeeDto dto) {
     return service.create(dto);
 }

 @PutMapping("/{id}")
 public EmployeeDto update(@PathVariable Long id, @RequestBody EmployeeDto dto) {
     return service.update(id, dto);
 }

 @DeleteMapping("/{id}")
 public void delete(@PathVariable Long id) {
     service.delete(id);
 }
}

