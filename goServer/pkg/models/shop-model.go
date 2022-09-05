package models

import (
	"github.com/jinzhu/gorm"
)

type Shop struct {
	gorm.Model
	ShopName     string `json:"shopName"`
	Active       bool   `json:"active"`
	Addresses_id uint   `gorm: "foreignkey: addresses_id" json:"addresses_id"`
}

func IsValidShopName(name string) bool {

	if len(name) < 5 {
		return false
	}
	return true
}
func CreateShop(s *Shop) *Shop {
	db.NewRecord(s)
	db.Create(s)
	return s
}

func GetShop(id uint) *Shop {
	var Shop Shop
	db.Find(&Shop, "id = ?", id)
	return &Shop
}

func UpdateShop(shop *Shop) {

	db.Model(&shop).Select("active").Updates(Shop{Active: true})
}
