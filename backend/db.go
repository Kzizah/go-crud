package backend

import (
	"fmt"
	"go-crud/config"
	"go-crud/models"
)

// MigrateDatabase migrates the database tables
func MigrateDatabase() {
	err := config.DB.AutoMigrate(&models.Category{},&models.Supplier{},&models.Product{})
	if err != nil {
		fmt.Println("Database migration failed:", err)
	} else {
		fmt.Println("Database migration successful!")
	}
}
