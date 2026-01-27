package com.payplate.menuservice.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.payplate.menuservice.entities.Menu;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Integer> {
}
