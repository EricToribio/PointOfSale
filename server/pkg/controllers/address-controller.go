package controllers

import (
	"encoding/json"
	"net/http"
	"pos/pkg/models"
	"pos/pkg/utils"
)

func NewAddress(w http.ResponseWriter, r *http.Request) {
	NewAddress := &models.Address{}
	utils.ParseBody(r, NewAddress)
	res := make(map[string]uint)

	newAddress, err := models.AddressExists(NewAddress)
	if err.Error() != "nil" {
		address := models.CreateAddress(NewAddress)
		res["address_id"] = address.ID
	} else {
		res["address_id"] = newAddress.ID
	}

	e, _ := json.Marshal(res)
	w.WriteHeader(http.StatusOK)
	w.Write(e)
}
