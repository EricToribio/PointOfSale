package com.pos.server.entity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter @Setter @NoArgsConstructor
public class NewShop {
    
    @NotNull
    @Size(min=4, message="Shop name must be at least 4 characters long")
    private String shopName;
    @NotNull
    @Size(min = 5)
    private String address;

    @NotNull
    @Size(min = 3)
    private String city;

    @NotNull
    @Size(min = 2,max = 2)
    private String state;

    @NotNull
    @Size(min = 5, max = 5)
    private int zipCode;

    @NotNull
    @Size(min = 3, message = "First Name must be at least 3 characters long")
    private String firstName;

    @NotNull
    @Size(min = 3, message = "Last Name must be at least 3 characters long")
    private String lastName;

    @NotNull
    @Email(message = "Enter a valid email address")
    private String email;

    @NotNull
    @Size(min = 8, max = 60, message = "Password must be at least 8 characters")
    private String password;

    @NotNull
    @Size(min = 8, max = 128, message = "Confirm Password must be at least 8 characters")
    private String confirm;

}
