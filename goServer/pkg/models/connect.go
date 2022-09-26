package models

import (
	"github.com/jinzhu/gorm"
	"pos/pkg/config"
)

var db *gorm.DB
var MySigningKey = []byte("mysupersecretphrase")

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Address{}, &User{}, &Shop{}, &Customer{}, &Vehicle{})
	db.Debug().Model(&Shop{}).AddForeignKey("addresses_id", "addresses(id)", "cascade", "cascade")
	db.Debug().Model(&Customer{}).AddForeignKey("addresses_id", "addresses(id)", "cascade", "cascade")
	db.Debug().Model(&User{}).AddForeignKey("shop_id", "shops(id)", "cascade", "cascade")
	db.Debug().Model(&Vehicle{}).AddForeignKey("customer_id", "customer(id)", "cascade", "cascade")
}
