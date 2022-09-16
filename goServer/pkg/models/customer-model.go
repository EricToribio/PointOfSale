package models

import (
	"errors"
	"fmt"

	"github.com/dgrijalva/jwt-go"
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

func GetCustomerById(id uint) (*Customer, error) {
	var Customer Customer
	db.Find(&Customer, "id = ?", id)
	if Customer.ID == 0 {
		err := errors.New("no user")
		return &Customer, err
	}
	return &Customer, nil
}

func NewCustomerToken(vehicle *Vehicle) (string, error) {
	customer, err := GetCustomerById(vehicle.Customer_id)
	if err != nil {
		return "", err
	}
	address, err := GetAddressById(customer.Addresses_id)
	if err != nil {
		return "", err
	}
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["customer"] = customer
	claims["address"] = address
	claims["vehicle"] = vehicle
	tokenString, err := token.SignedString(MySigningKey)
	if err != nil {
		fmt.Errorf("Something went wrong: %v", err.Error())
		return "", err
	}
	return tokenString, nil
}
