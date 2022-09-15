package models

import (
	"errors"
	"fmt"

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

func CreateCustomer(c *Customer) *Customer {
	db.NewRecord(c)
	db.Create(c)
	return c
}

func FindCustomerByPhoneNumber(phoneNumber string) (*Customer, error) {
	var Customer Customer
	db.Find(&Customer, "phone_number = ?", phoneNumber)
	if Customer.PhoneNumber == "" {
		fmt.Println("hi1", Customer)
		err := errors.New("no customer")
		return &Customer, err
	}
	return &Customer, errors.New("nil")
}
