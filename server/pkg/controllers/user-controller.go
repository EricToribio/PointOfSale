package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pos/middleware"
	"pos/pkg/models"
	"pos/pkg/utils"
	"time"
)

func NewUser(w http.ResponseWriter, r *http.Request) {
	errors := make(map[string]string)
	NewUser := &models.User{}
	utils.ParseBody(r, NewUser)

	if !models.IsEmailValid(NewUser.Email) {
		errors["email"] = "Enter a valid email"
	}
	if !models.IsValidPassword(NewUser.Password) {
		errors["password"] = "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long"
	}
	if len(errors) > 0 {
		res, _ := json.Marshal(errors)
		w.Write(res)
		return
	}
	fmt.Print(NewUser.FirstName)
	newUser := models.FindUserByEmail(NewUser.Email)
	if !newUser {
		NewUser.Password = models.HashPassword(NewUser.Password)
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
			"shopName":  ShopName.ShopName,
			"owner":     user.Owner,
			"admin":     user.Admin,
			"act":       ShopName.Active,
		}
		//fmt.Printf(refreshToken)
		accessCookie := &http.Cookie{Name: "accessToken", Value: accessToken}
		accessCookie.HttpOnly = true
		accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, accessCookie)
		refreshCookie := &http.Cookie{Name: "refreshToken", Value: refreshToken}
		refreshCookie.HttpOnly = true
		refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, refreshCookie)
		e, _ := json.Marshal(res)
		w.WriteHeader(http.StatusOK)
		w.Write(e)
	}

}

func NewLogin(w http.ResponseWriter, r *http.Request) {
	PotentialUser := &models.User{}
	utils.ParseBody(r, PotentialUser)
	user, err := models.GetUserByEmail(PotentialUser.Email)
	if err.Error() == "no user" {
		res := map[string]string{
			"error": "Invalid Email or Password",
		}
		e, _ := json.Marshal(res)
		w.WriteHeader(401)
		w.Write(e)

	} else if !models.CheckPasswordHash(PotentialUser.Password, user.Password) {
		res := map[string]string{
			"error": "Invalid Email or Password",
		}
		e, _ := json.Marshal(res)
		w.WriteHeader(401)
		w.Write(e)
	} else {
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
			"shopName":  ShopName.ShopName,
			"owner":     user.Owner,
			"admin":     user.Admin,
			"act":       ShopName.Active,
		}
		//fmt.Printf(refreshToken)
		accessCookie := &http.Cookie{Name: "accessToken", Value: accessToken}
		accessCookie.HttpOnly = true
		accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, accessCookie)
		refreshCookie := &http.Cookie{Name: "refreshToken", Value: refreshToken}
		refreshCookie.HttpOnly = true
		refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, refreshCookie)
		e, _ := json.Marshal(res)
		w.WriteHeader(http.StatusOK)
		w.Write(e)
	}
}
func RefreshAuth(w http.ResponseWriter, r *http.Request) {
	refreshToken, _ := r.Cookie("refreshToken")
	tokenString := refreshToken.Value
	token, claims, err := middleware.VerifyToken(tokenString)
	if middleware.IsExpired(claims["exp"]) {
		fmt.Print("expired token")
		res := map[string]string{
			"error": "Session expired",
		}
		e, _ := json.Marshal(res)
		w.WriteHeader(401)
		w.Write(e)
		return
	} else if !token.Valid || err != nil {
		fmt.Print("invalid token")
		valid := map[string]string{
			"error": "Invalid",
		}
		v, _ := json.Marshal(valid)
		w.WriteHeader(401)
		w.Write(v)
		return
		// handle invalid tokebn
	} else {
		user, err := models.GetUserById(claims["id"])
		if err.Error() == "no user" {
			res := map[string]string{
				"error": "No User",
			}
			e, _ := json.Marshal(res)
			w.WriteHeader(401)
			w.Write(e)

		} else {
			accessToken, err := models.AccessToken(user)
			if err != nil {
				fmt.Println("Error generating AccessToken: ", err.Error())
			}
			refreshToken, err := models.RefreshToken(user.ID)
			if err != nil {
				fmt.Println("Error generating RefreshToken: ", err.Error())
			}
			ShopName := models.GetShop(user.Shop_id)
			fmt.Print(ShopName)
			res := map[string]any{
				"firstName": user.FirstName,
				"lastName":  user.LastName,
				"id":        user.ID,
				"shopName":  ShopName.ShopName,
				"act":       ShopName.Active,
				"admin":     user.Admin,
				"owner":     user.Owner,
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
}
func AccessAuth(w http.ResponseWriter, r *http.Request) {
	accessCookie, _ := r.Cookie("accessToken")
	refreshCookie, _ := r.Cookie("refreshToken")
	tokenString := accessCookie.Value
	token, claims, err := middleware.VerifyToken(tokenString)
	if middleware.IsExpired(claims["exp"]) {
		fmt.Print("expired token")
		res := map[string]string{
			"error": "Session expired",
		}
		e, _ := json.Marshal(res)
		w.WriteHeader(401)
		w.Write(e)
		return
	} else if !token.Valid || err != nil {
		fmt.Print("invalid token")
		valid := map[string]string{
			"error": "Invalid",
		}
		v, _ := json.Marshal(valid)
		w.WriteHeader(401)
		w.Write(v)
		return
		// handle invalid token
	} else {
		user, err := models.GetUserById(claims["id"])
		if err.Error() == "no user" {
			fmt.Println(err.Error())
			res := map[string]string{
				"error": "No User",
			}
			e, _ := json.Marshal(res)
			w.WriteHeader(401)
			w.Write(e)

		} else {
			accessToken, err := models.AccessToken(user)
			if err != nil {
				fmt.Println("Error generating AccessToken: ", err.Error())
			}
			refreshToken, err := models.RefreshToken(user.ID)
			if err != nil {
				fmt.Println("Error generating RefreshToken: ", err.Error())
			}
			ShopName := models.GetShop(user.Shop_id)
			fmt.Print(ShopName)
			res := map[string]any{
				"firstName": user.FirstName,
				"lastName":  user.LastName,
				"id":        user.ID,
				"shopName":  ShopName.ShopName,
				"act":       ShopName.Active,
				"admin":     user.Admin,
				"owner":     user.Owner,
			}
			e, _ := json.Marshal(res)
			//fmt.Printf(refreshToken)
			accessCookie = &http.Cookie{Name: "accessToken", Value: accessToken}
			accessCookie.HttpOnly = true
			accessCookie.Path = "/"
			accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
			http.SetCookie(w, accessCookie)
			refreshCookie = &http.Cookie{Name: "refreshToken", Value: refreshToken}
			refreshCookie.HttpOnly = true
			refreshCookie.Path = "/"
			refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
			http.SetCookie(w, refreshCookie)

			w.WriteHeader(http.StatusOK)
			w.Write(e)
		}
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	accessCookie, _ := r.Cookie("accessToken")
	refreshCookie, _ := r.Cookie("refreshToken")
	res := map[string]string{
		"success": "Logout successful",
	}
	e, _ := json.Marshal(res)
	accessCookie = &http.Cookie{Name: "accessToken", Value: "123", Path: "/"}
	accessCookie.HttpOnly = true
	accessCookie.Path = "/"
	accessCookie.MaxAge = -1
	refreshCookie = &http.Cookie{Name: "refreshToken", Value: "123", Path: "/"}
	refreshCookie.Path = "/"
	refreshCookie.HttpOnly = true
	refreshCookie.MaxAge = -1
	http.SetCookie(w, accessCookie)
	http.SetCookie(w, refreshCookie)
	w.WriteHeader(http.StatusOK)
	w.Write(e)
}
