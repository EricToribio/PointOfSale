package controllers

import (
	"encoding/json"
	"net/http"
	"pos/pkg/models"
	"pos/pkg/utils"
)

func NewShop(w http.ResponseWriter, r *http.Request) {
	errors := make(map[string]string)
	NewShop := &models.Shop{}
	utils.ParseBody(r, NewShop)
	res := make(map[string]uint)
	if !models.IsValidShopName(NewShop.ShopName) {
		errors["shopName"] = " Shop name must be at least 5 characters long!"
	}
	if len(errors) > 0 {
		res, _ := json.Marshal(errors)
		w.Write(res)
		return
	}
	shop := models.CreateShop(NewShop)
	res["shop_id"] = shop.ID
	e, _ := json.Marshal(res)
	w.WriteHeader(http.StatusOK)
	w.Write(e)
}
