package models

import (
	"github.com/jinzhu/gorm"
	"pos/pkg/config"
)

var db *gorm.DB
var mySigningKey = []byte("mysupersecretphrase")

type User struct {
	gorm.Model
	Email        string `json:"email"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	Password     string `json:"password"`
	Addresses_id uint   `gorm: "foreignkey: addresses_id" json:"addresses_id"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Address{}, &User{})
	db.Debug().Model(&User{}).AddForeignKey("addresses_id", "addresses(id)", "cascade", "cascade")
}
func (u *User) CreateUser() *User {
	db.NewRecord(u)
	db.Create(u)
	return u
}
