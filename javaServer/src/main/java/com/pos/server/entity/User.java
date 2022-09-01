package com.pos.server.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private boolean isActiveEmployee;

    @NotNull
    private boolean isAdmin;

    @NotNull
    private boolean isOwner;

    @NotEmpty(message = "Password is required!")
    @Size(min = 8, max = 60, message = "Password must be at least 8 characters")
    private String password;

    @Transient
    @Size(min = 8, max = 128, message = "Confirm Password must be at least 8 characters")
    private String confirm;

    @ManyToOne(targetEntity = Shop.class)
    private Shop shop;

    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

}
