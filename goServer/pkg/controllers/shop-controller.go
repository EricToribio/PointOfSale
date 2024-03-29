package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"pos/middleware"
	"pos/pkg/models"
	"pos/pkg/utils"
	"time"
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
	// if !models.IsValidShopName(NewShop.ShopName) {
	// 	errors["shopName"] = " Shop name must be at least 5 characters long!"
	// 	if !models.IsEmailValid(NewUser.Email) {
	// 		errors["email"] = "Enter a valid email"
	// 	}
	// 	if !models.IsValidPassword(NewUser.Password) {
	// 		errors["password"] = "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
	// 	}
	// }
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
		accessToken, err := models.AccessToken(user)
		if err != nil {
			fmt.Println("Error generating AccessToken: ", err.Error())
		}
		refreshToken, err := models.RefreshToken(user.ID)
		if err != nil {
			fmt.Println("Error generating RefreshToken: ", err.Error())
		}
		ShopName := models.GetShop(user.Shop_id)
		res := map[string]any{
			"firstName": user.FirstName,
			"lastName":  user.LastName,
			"id":        user.ID,
			"shopName":  ShopName,
		}
		e, _ := json.Marshal(res)
		//fmt.Printf(refreshToken)
		accessCookie := &http.Cookie{Name: "accessToken", Value: accessToken}
		accessCookie.HttpOnly = true
		accessCookie.Path = "/"
		accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, accessCookie)
		refreshCookie := &http.Cookie{Name: "refreshToken", Value: refreshToken}
		refreshCookie.HttpOnly = true
		refreshCookie.Path = "/"
		refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, refreshCookie)

		w.WriteHeader(http.StatusOK)
		w.Write(e)
	}
}

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		fmt.Println("id is missing in parameters")
	}
	e, _ := json.Marshal(id)
	w.WriteHeader(http.StatusOK)
	w.Write(e)

}
func Activate(w http.ResponseWriter, r *http.Request) {
	accessCookie, _ := r.Cookie("accessToken")
	refreshCookie, _ := r.Cookie("refreshToken")
	accessTokenString := accessCookie.Value
	refreshTokenString := refreshCookie.Value
	accessToken, accClaims, accErr := middleware.VerifyToken(accessTokenString)
	refreshToken, refClaims, refErr := middleware.VerifyToken(refreshTokenString)
	if !accessToken.Valid || accErr != nil {
		fmt.Print("invalid token")
		valid := map[string]string{
			"error": "Invalid",
		}
		v, _ := json.Marshal(valid)
		w.WriteHeader(401)
		w.Write(v)
		return
	} else if !refreshToken.Valid || refErr != nil {
		fmt.Print("invalid token")
		valid := map[string]string{
			"error": "Invalid",
		}
		v, _ := json.Marshal(valid)
		w.WriteHeader(401)
		w.Write(v)
		return
	}
	if accClaims == nil {

		user, err := models.GetUserById(accClaims["id"])
		if err.Error() == "no user" {
			fmt.Println(err.Error())
			res := map[string]string{
				"error": "No User",
			}
			e, _ := json.Marshal(res)
			w.WriteHeader(401)
			w.Write(e)
			return
		}
		shop := models.GetShop(user.Shop_id)
		models.UpdateShop(shop)

		e, _ := json.Marshal("success")
		w.WriteHeader(200)
		w.Write(e)
		return
	}
	if refClaims == nil {

		user, err := models.GetUserById(refClaims["id"])
		if err.Error() == "no user" {
			fmt.Println(err.Error())
			res := map[string]string{
				"error": "No User",
			}
			e, _ := json.Marshal(res)
			w.WriteHeader(401)
			w.Write(e)
			return
		}
		shop := models.GetShop(user.Shop_id)
		models.UpdateShop(shop)

		e, _ := json.Marshal("success")
		w.WriteHeader(200)
		w.Write(e)
		return
	}
}
