package models

import (
	"errors"
	"github.com/jinzhu/gorm"
)

type Address struct {
	gorm.Model
	Street string `json:"address"`
	City   string `json:"city"`
	State  string `json:"state"`
	Zip    string `json:"zip"`
}

func CreateAddress(a *Address) *Address {
	db.NewRecord(a)
	db.Create(a)
	return a
}

func AddressExists(address *Address) (*Address, error) {

	var PossibleAddress Address
	db.Find(&PossibleAddress, "street = ? AND city = ? AND state = ? AND zip = ?", address.Street, address.City, address.State, address.Zip)
	if PossibleAddress.Street == "" {
		err := errors.New("no address")
		return &PossibleAddress, err
	}
	return &PossibleAddress, errors.New("nil")

}
