package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"pos/pkg/models"
	"pos/pkg/utils"
)

type Customer struct {
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone"`
	Address     string `json:"address"`
	City        string `json:"city"`
	State       string `json:"state"`
	Zip         string `json:"zip"`
	Year        int64  `json:"year"`
	Make        string `json:"make"`
	Model       string `json:"model"`
	Vin         string `json:"vin"`
	Plate       string `json:"plate"`
	EngineSize  int64  `json:"engineSize"`
}

func NewCustomer(w http.ResponseWriter, r *http.Request) {
	Customer := &Customer{}
	utils.ParseBody(r, Customer)
	fmt.Print(Customer)
	NewCustomer := &models.Customer{}
	NewCustomer.FirstName = Customer.FirstName
	NewCustomer.LastName = Customer.LastName
	NewCustomer.Email = Customer.Email
	NewAddress := &models.Address{}
	NewAddress.Street = Customer.Address
	NewAddress.City = Customer.City
	NewAddress.State = Customer.State
	NewAddress.Zip = Customer.Zip
	newAddress, err := models.AddressExists(NewAddress)
	if err.Error() != "nil" {
		address := models.CreateAddress(NewAddress)
		NewCustomer.Addresses_id = address.ID
	} else {
		NewCustomer.Addresses_id = newAddress.ID
	}
	newVehicle := &models.Vehicle{}
	newVehicle.Vin = Customer.Vin
	newVehicle.VehicleModel = Customer.Model
	newVehicle.Make = Customer.Make
	newVehicle.Year = Customer.Year
	newVehicle.Plate = Customer.Plate
	newVehicle.EngineSize = Customer.EngineSize
	foundCustomer, err := models.FindCustomerByPhoneNumber(Customer.PhoneNumber)
	if err.Error() != "nil" {
		customer := models.CreateCustomer(NewCustomer)
		newVehicle.Customer_id = customer.ID
	} else {
		newVehicle.Customer_id = foundCustomer.ID
	}
	Vehicle := models.CreateVehicle(newVehicle)
	e, _ := json.Marshal(Vehicle)
	w.WriteHeader(200)
	w.Write(e)
}
