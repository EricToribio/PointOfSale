package models

import "github.com/jinzhu/gorm"

type Address struct {
	gorm.Model
	Street string `json:"address"`
	City   string `json:"city"`
	State  string `json:"state"`
	Zip    string `json:"zip"`
}
