package routes

import (
	"pos/pkg/controllers"

	"github.com/gorilla/mux"
)

var UserRoutes = func(router *mux.Router) {
	router.HandleFunc("/api/new/user", controllers.NewUser).Methods("POST")
	router.HandleFunc("/api/login", controllers.NewLogin).Methods("POST")
}

var AddressRoutes = func(router *mux.Router) {

}

var ShopRoutes = func(router *mux.Router) {
	router.HandleFunc("/api/new/shop", controllers.NewShopSignUp).Methods("POST")
}
