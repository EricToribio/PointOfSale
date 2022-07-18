package controllers

import (
	"fmt"
	"net/http"
	"pos/pkg/models"
	"pos/pkg/utils"
)

func NewUser(w http.ResponseWriter, r *http.Request) {
	NewUser := &models.User{}
	NewAddress := models.Address{}
	utils.ParseBody(r, NewUser)
	utils.ParseBody(r, NewAddress)
	fmt.Println(NewUser.FirstName, NewAddress.Street)
}
