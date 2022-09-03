package com.pos.server.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.server.entity.User;
import com.pos.server.repos.UserRepo;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    public List<HashMap<String, String>> getUsersByShop(Long id) {
        List<User> users = userRepo.findAllByShop_id(id);
        List<HashMap<String,String>> result = new ArrayList<HashMap<String,String>>();
        for (int i = 0; i < users.size(); i++) {
            HashMap<String,String> map = new HashMap<String,String>();
            map.put("firstName",users.get(i).getFirstName());
            map.put("lastName",users.get(i).getLastName());
            result.add(map);
        }
        return result;
}
}
