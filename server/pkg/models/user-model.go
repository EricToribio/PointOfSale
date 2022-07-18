package models

import (
	"github.com/jinzhu/gorm"
	"pos/pkg/config"
)

var db *gorm.DB
var mySigningKey = []byte("mysupersecretphrase")

type User struct {
	gorm.Model
	Email     string  `json:"email"`
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	Password  string  `json:"password"`
	Address   Address `gorm: "foreignkey" json:"address_id"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Address{}, &User{})
	db.Debug().Model(&User{}).AddForeignKey("user_id", "user(id)", "cascade", "cascade")
}
func (u *User) CreateUser() *User {
	db.NewRecord(u)
	db.Create(u)
	return u
}
