package com.pos.server.repos;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pos.server.entity.Address;
@Repository
public interface AddressRepo extends CrudRepository<Address,Long> {

    Optional<Address> findById(Long id);
    
}
