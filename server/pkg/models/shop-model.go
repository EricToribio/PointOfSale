package models

import "github.com/jinzhu/gorm"

type Shop struct {
	gorm.Model
	ShopName     string `json:"shopName"`
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
