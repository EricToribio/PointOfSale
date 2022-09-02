package com.pos.server.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pos.server.entity.NewShop;
import com.pos.server.entity.Shop;
import com.pos.server.entity.User;
import com.pos.server.services.AddressService;
import com.pos.server.services.ShopService;
import com.pos.server.services.UserService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    
    @Autowired
    private UserService userService;
    @Autowired
    private AddressService addressServ;
    @Autowired
    private ShopService shopServ;

    @PostMapping("/new/shop")
    public  ResponseEntity<?> createNewShop(@Valid @RequestBody NewShop newShop,BindingResult result) {
        User register = shopServ.register(newShop,result);
        if(result.hasErrors()){
            return new ResponseEntity<>(result.getFieldErrors(),HttpStatus.valueOf(400));
        }
    return new ResponseEntity<>(register,HttpStatus.valueOf(200));
    }

    @GetMapping("/shop/1")
    public List<User> getShop(){
        Shop shop = shopServ.getShop(1);
        return shop.getUser();
    }
}
