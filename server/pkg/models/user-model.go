package models

import "github.com/jinzhu/gorm"

var db *gorm.DB
var mySigningKey = []byte("mysupersecretphrase")

type User struct {
	gorm.Model
	Email     string  `json:"email"`
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Password  string  `json:"password"`
	Address   Address `gorm: "foreignkey" json:"addresses_id"`
}
