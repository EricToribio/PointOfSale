package routes

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func test(w http.ResponseWriter, r *http.Request) {
	res, _ := json.Marshal("hi")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

var UserRoutes = func(router *mux.Router) {
	router.HandleFunc("/api/test", test).Methods("Get")
}
