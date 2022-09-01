package com.pos.server.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pos.server.services.AddressService;
import com.pos.server.services.ShopService;
import com.pos.server.services.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService userService;
    @Autowired
    private AddressService addressServ;
    @Autowired
    private ShopService shopServ;

    @PostMapping("/new/shop")
    public ResponseEntity<> createNewShop(@Valid @RequestBody NewShop newShop,BindingResult result) {
        
    }
}
