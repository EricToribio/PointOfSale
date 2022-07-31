package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pos/pkg/models"
	"pos/pkg/utils"
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
		NewUser.Active = false
		NewUser.Password = models.HashPassword(NewUser.Password)
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

func NewLogin(w http.ResponseWriter, r *http.Request) {
	PotentialUser := &models.User{}
	utils.ParseBody(r, PotentialUser)
	user, err := models.GetUserByEmail(PotentialUser.Email)
	if err.Error() == "no user" {
		res := map[string]string{
			"error": "Invalid Email or Password",
		}
		e, _ := json.Marshal(res)
		w.Write(e)

	} else if !models.CheckPasswordHash(PotentialUser.Password, user.Password) {
		res := map[string]string{
			"error": "Invalid Email or Password",
		}
		e, _ := json.Marshal(res)
		w.Write(e)
	} else {
		jwt, err := models.GenerateJwt(user)
		if err != nil {
			fmt.Println("Error generating JWT", err.Error())
		}
		res, _ := json.Marshal(jwt)
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}
}
