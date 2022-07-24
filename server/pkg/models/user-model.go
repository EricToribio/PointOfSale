package models

import (
	"fmt"
	"pos/pkg/config"

	"github.com/jinzhu/gorm"
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
func CreateUser(u *User) *User {
	db.NewRecord(u)
	db.Create(u)
	return u
}
func FindUserByEmail(Email string) bool {
	var result struct {
		Found bool
	}
	db.Raw("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS found",
		Email).Scan(&result)
	if result.Found {
		fmt.Println("found")
	} else {
		fmt.Println("not found")
	}
	return result.Found
}
