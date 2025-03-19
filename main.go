package main

import (
	"go-crud/backend"
	"go-crud/config"
)

func main() {
	config.ConnectDatabase()
	backend.MigrateDatabase()

	r := backend.SetupRouter()
	r.Run(":8080")
}
