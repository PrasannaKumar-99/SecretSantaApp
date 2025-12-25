package com.example.secret_santa;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

 private final EmployeeRepository employeeRepo;

 public EmployeeService(EmployeeRepository employeeRepo) {
     this.employeeRepo = employeeRepo;
 }

 public List<EmployeeDto> getAll() {
     return employeeRepo.findAll().stream().map(this::toDto).toList();
 }

 public EmployeeDto getById(Long id) {
     Employee emp = employeeRepo.findById(id).orElseThrow();
     return toDto(emp);
 }

 public EmployeeDto create(EmployeeDto dto) {
     Employee emp = new Employee();
     emp.setName(dto.getName());

     EmployeeFavorites fav = new EmployeeFavorites();
     fav.setEmployee(emp);
     List<String> f = dto.getFavorites();
     fav.setFav1(f.size() > 0 ? f.get(0) : null);
     fav.setFav2(f.size() > 1 ? f.get(1) : null);
     fav.setFav3(f.size() > 2 ? f.get(2) : null);
     fav.setFav4(f.size() > 3 ? f.get(3) : null);
     fav.setFav5(f.size() > 4 ? f.get(4) : null);

     emp.setFavorites(fav);

     Employee saved = employeeRepo.save(emp);
     return toDto(saved);
 }

 public EmployeeDto update(Long id, EmployeeDto dto) {
     Employee emp = employeeRepo.findById(id).orElseThrow();
     emp.setName(dto.getName());

     EmployeeFavorites fav = emp.getFavorites();
     if (fav == null) {
         fav = new EmployeeFavorites();
         fav.setEmployee(emp);
     }
     List<String> f = dto.getFavorites();
     fav.setFav1(f.size() > 0 ? f.get(0) : null);
     fav.setFav2(f.size() > 1 ? f.get(1) : null);
     fav.setFav3(f.size() > 2 ? f.get(2) : null);
     fav.setFav4(f.size() > 3 ? f.get(3) : null);
     fav.setFav5(f.size() > 4 ? f.get(4) : null);

     emp.setFavorites(fav);

     Employee saved = employeeRepo.save(emp);
     return toDto(saved);
 }

 public void delete(Long id) {
     employeeRepo.deleteById(id);
 }

 private EmployeeDto toDto(Employee emp) {
     EmployeeDto dto = new EmployeeDto();
     dto.setId(emp.getId());
     dto.setName(emp.getName());
     EmployeeFavorites fav = emp.getFavorites();

     List<String> list = new ArrayList<>();
     if (fav != null) {
         if (fav.getFav1() != null) list.add(fav.getFav1());
         if (fav.getFav2() != null) list.add(fav.getFav2());
         if (fav.getFav3() != null) list.add(fav.getFav3());
         if (fav.getFav4() != null) list.add(fav.getFav4());
         if (fav.getFav5() != null) list.add(fav.getFav5());
     }
     dto.setFavorites(list);
     return dto;
 }
}

