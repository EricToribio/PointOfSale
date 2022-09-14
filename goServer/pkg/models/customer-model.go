package models

import (
	"github.com/jinzhu/gorm"
)

type Customer struct {
	gorm.Model
	Email        string `json:"email"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	PhoneNumber  string `json:"phoneNumber"`
	Addresses_id uint   `gorm: "foreignkey : addresses_id" json:"addresses_id"`
}
