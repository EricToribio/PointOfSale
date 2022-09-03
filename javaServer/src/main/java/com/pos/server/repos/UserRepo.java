package com.pos.server.repos;


import java.util.List;
import java.util.Optional;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.pos.server.entity.User;

@Repository
public interface UserRepo extends CrudRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findAllByShop_id(Long id);
    
    
}
