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
		userToken, err := models.UserToken(user)
		if err != nil {
			fmt.Println("Error generating UserToken: ", err.Error())
		}

		userCookie := &http.Cookie{Name: "userToken", Value: userToken, Path: "/"}
		http.SetCookie(w, userCookie)
		accessCookie := &http.Cookie{Name: "accessToken", Value: accessToken}
		accessCookie.HttpOnly = true
		accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, accessCookie)
		refreshCookie := &http.Cookie{Name: "refreshToken", Value: refreshToken}
		refreshCookie.HttpOnly = true
		refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, refreshCookie)
		e, _ := json.Marshal("success")
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
		userToken, err := models.UserToken(user)
		if err != nil {
			fmt.Println("Error generating RefreshToken: ", err.Error())
		}

		userCookie := &http.Cookie{Name: "userToken", Value: userToken, Path: "/"}
		http.SetCookie(w, userCookie)
		accessCookie := &http.Cookie{Name: "accessToken", Value: accessToken}
		accessCookie.HttpOnly = true
		accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, accessCookie)
		refreshCookie := &http.Cookie{Name: "refreshToken", Value: refreshToken}
		refreshCookie.HttpOnly = true
		refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
		http.SetCookie(w, refreshCookie)
		e, _ := json.Marshal("success")
		w.WriteHeader(http.StatusOK)
		w.Write(e)
	}
}
func RefreshAuth(w http.ResponseWriter, r *http.Request) {
	refreshToken, _ := r.Cookie("refreshToken")
	accessCookie, _ := r.Cookie("accessToken")
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
			userToken, err := models.UserToken(user)
			if err != nil {
				fmt.Println("Error generating RefreshToken: ", err.Error())
			}

			userCookie := &http.Cookie{Name: "userToken", Value: userToken, Path: "/"}
			accessCookie = &http.Cookie{Name: "accessToken", Value: accessToken}
			accessCookie.HttpOnly = true
			accessCookie.Path = "/"
			accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
			refreshCookie := &http.Cookie{Name: "refreshToken", Value: refreshToken}
			refreshCookie.HttpOnly = true
			refreshCookie.Path = "/"
			refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
			http.SetCookie(w, userCookie)
			http.SetCookie(w, accessCookie)
			http.SetCookie(w, refreshCookie)
			e, _ := json.Marshal("success")
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
			userToken, err := models.UserToken(user)
			if err != nil {
				fmt.Println("Error generating RefreshToken: ", err.Error())
			}
			userCookie := &http.Cookie{Name: "userToken", Value: userToken, Path: "/"}
			http.SetCookie(w, userCookie)
			accessCookie = &http.Cookie{Name: "accessToken", Value: accessToken, HttpOnly: true, Path: "/"}
			accessCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
			http.SetCookie(w, accessCookie)
			refreshCookie = &http.Cookie{Name: "refreshToken", Value: refreshToken, HttpOnly: true, Path: "/"}
			refreshCookie.Expires = time.Now().UTC().AddDate(0, 0, 1)
			http.SetCookie(w, refreshCookie)
			e, _ := json.Marshal("success")
			w.WriteHeader(http.StatusOK)
			w.Write(e)
		}
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	accessCookie, _ := r.Cookie("accessToken")
	refreshCookie, _ := r.Cookie("refreshToken")
	userCookie, _ := r.Cookie("userToken")
	res := map[string]string{
		"success": "Logout successful",
	}
	userCookie = &http.Cookie{Name: "userToken", Value: "123", Path: "/", MaxAge: -1}
	accessCookie = &http.Cookie{Name: "accessToken", Value: "123", Path: "/", MaxAge: -1}
	refreshCookie = &http.Cookie{Name: "refreshToken", Value: "123", Path: "/", MaxAge: -1}
	http.SetCookie(w, userCookie)
	http.SetCookie(w, accessCookie)
	http.SetCookie(w, refreshCookie)
	e, _ := json.Marshal(res)
	w.WriteHeader(http.StatusOK)
	w.Write(e)
}
