package models

import "github.com/jinzhu/gorm"

type Vehicle struct {
	gorm.Model
	Vin          string `json:"vin"`
	Make         string `json:"make"`
	VehicleModel string `json:"model"`
	Plate        string `json:"plate"`
	Year         string `json:"year"`
	EngineSize   string `json:"engineSize"`
	Customer_id  uint   `gorm: "foreignkey : Customer_id" json: "customer_id"`
}

func CreateVehicle(v *Vehicle) *Vehicle {
	db.NewRecord(v)
	db.Create(v)
	return v
}
