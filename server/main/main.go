package main

import (
	"log"
	"net/http"
	"pos/pkg/config"
	"pos/pkg/routes"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	config.Connect()
	r := mux.NewRouter()
	routes.UserRoutes(r)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)
	log.Fatal(http.ListenAndServe("localhost:8080", handler))
}
