package com.pos.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.pos.server.entity.Address;
import com.pos.server.entity.NewShop;
import com.pos.server.entity.Shop;
import com.pos.server.entity.User;
import com.pos.server.repos.AddressRepo;
import com.pos.server.repos.ShopRepo;
import com.pos.server.repos.UserRepo;

@Service
public class ShopService {

    @Autowired
    ShopRepo ShopRepo;
    
    @Autowired
    UserRepo userRepo;

    @Autowired 
    AddressRepo addressRepo;

    public User register(NewShop newShop,BindingResult result){
        Optional<Shop> possibleShop = ShopRepo.findByShopName(newShop.getShopName());
        if (possibleShop.isPresent()) {
            result.rejectValue("shopName", "error","Shop already exist");
            return null;
        }

        Optional<User> isUser = userRepo.findByEmail(newShop.getEmail());
        if (isUser.isPresent()) {
            result.rejectValue("email","error", "Email is already registered");
            return null;
        }
        Address address = new Address();
        address.setAddress(newShop.getAddress());
        address.setCity(newShop.getCity());
        address.setState(newShop.getState());
        address.setZipCode(newShop.getZipCode());
        Address addId = addressRepo.save(address);

        Shop shop = new Shop();
        shop.setActive(false);
        shop.setShopName(newShop.getShopName());
        shop.setAddress(addId);
        Shop shopId = ShopRepo.save(shop);
        

        User user = new User();
        user.setEmail(newShop.getEmail());
        user.setFirstName(newShop.getFirstName());
        user.setLastName(newShop.getLastName());
        user.setPassword(newShop.getPassword());
        user.setActiveEmployee(false);
        user.setAdmin(false);
        user.setOwner(false);
        user.setShop(shopId);
        userRepo.save(user);

        return user;
    }
    public Shop getShop(Long id){
        Optional<Shop> possibleShop = ShopRepo.findById(id);
        
        return possibleShop.get();
    }
    
}
