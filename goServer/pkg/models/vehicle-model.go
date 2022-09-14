package models

import "github.com/jinzhu/gorm"

type Vehicle struct {
	gorm.Model
	Vin          string `json:"vin"`
	Make         string `json:"make"`
	VehicleModel string `json:"model"`
	Plate        string `json:"plate"`
	Year         int64  `json:"year"`
	EngineSize   int64  `json:"engineSize"`
	User_id      uint   `gorm: "foreignkey : user_id" json: "user_id"`
}
