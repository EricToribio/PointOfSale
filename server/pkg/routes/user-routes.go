package routes

import (
	"pos/pkg/controllers"

	"github.com/gorilla/mux"
)

var UserRoutes = func(router *mux.Router) {
	router.HandleFunc("/api/new/address", controllers.NewAddress).Methods("POST")
	router.HandleFunc("/api/new/user", controllers.NewUser).Methods("POST")
}
