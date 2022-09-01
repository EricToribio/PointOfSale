package routes

import (
	"pos/pkg/controllers"

	"github.com/gorilla/mux"
)

var UserRoutes = func(router *mux.Router) {
	router.HandleFunc("/api/new/Shop", controllers.NewUser).Methods("POST")
	router.HandleFunc("/api/login", controllers.NewLogin).Methods("POST")
	router.HandleFunc("/api/acc/auth", controllers.AccessAuth).Methods("GET")
	router.HandleFunc("/api/ref/auth", controllers.RefreshAuth).Methods("GET")
	router.HandleFunc("/api/logout", controllers.Logout).Methods("GET")
}

var AddressRoutes = func(router *mux.Router) {

}

var ShopRoutes = func(router *mux.Router) {
	router.HandleFunc("/api/new/shop", controllers.NewShopSignUp).Methods("POST")
}
