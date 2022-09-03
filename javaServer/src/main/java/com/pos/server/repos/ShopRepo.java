package com.pos.server.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pos.server.entity.Shop;

@Repository
public interface ShopRepo extends CrudRepository<Shop, Long> {

    Optional<Shop> findById(Long id);
    
    Optional<Shop> findByShopName(String name);
}
