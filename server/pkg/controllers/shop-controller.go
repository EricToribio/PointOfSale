package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pos/pkg/models"
	"pos/pkg/utils"
)

type NewShop struct {
	Street    string `json:"address"`
	City      string `json:"city"`
	State     string `json:"state"`
	Zip       string `json:"zip"`
	ShopName  string `json:"shop_name"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Password  string `json:"password"`
	Email     string `json:"email"`
}

func NewShopSignUp(w http.ResponseWriter, r *http.Request) {
	errors := make(map[string]string)
	NewShop := &NewShop{}
	utils.ParseBody(r, NewShop)
	NewUser := &models.User{}
	NewUser.FirstName = NewShop.FirstName
	NewUser.LastName = NewShop.LastName
	NewUser.Email = NewShop.Email
	NewUser.Admin = true
	NewUser.Owner = true
	NewUser.ActiveEmployee = true
	Shop := &models.Shop{}
	Shop.ShopName = NewShop.ShopName
	Shop.Active = false
	NewAddress := &models.Address{}
	NewAddress.Street = NewShop.Street
	NewAddress.City = NewShop.City
	NewAddress.State = NewShop.State
	NewAddress.Zip = NewShop.Zip
	newAddress, err := models.AddressExists(NewAddress)
	if err.Error() != "nil" {
		address := models.CreateAddress(NewAddress)
		Shop.Addresses_id = address.ID
	} else {
		Shop.Addresses_id = newAddress.ID
	}
	if !models.IsValidShopName(NewShop.ShopName) {
		errors["shopName"] = " Shop name must be at least 5 characters long!"
		if !models.IsEmailValid(NewUser.Email) {
			errors["email"] = "Enter a valid email"
		}
		if !models.IsValidPassword(NewUser.Password) {
			errors["password"] = "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
		}
	}
	if len(errors) > 0 {
		res, _ := json.Marshal(errors)
		w.Write(res)
		return
	}
	shop := models.CreateShop(Shop)
	NewUser.Shop_id = shop.ID
	fmt.Print(NewUser.FirstName)
	newUser := models.FindUserByEmail(NewUser.Email)
	if !newUser {
		NewUser.Password = models.HashPassword(NewShop.Password)
		user := models.CreateUser(NewUser)
		jwt, err := models.GenerateJwt(user)
		if err != nil {
			fmt.Println("Error generating JWT", err.Error())
		}
		res, _ := json.Marshal(jwt)
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}
}
