package main

import (
	"net/http"
	"pos/pkg/routes"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()
	routes.UserRoutes(r)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)
	http.ListenAndServe("localhost:8080", handler)
}
