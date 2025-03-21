package config

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "root:6970@tcp(127.0.0.1:3306)/categorydb?charset=utf8mb4&parseTime=True&loc=Local"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}

	DB = database
	fmt.Println("Database connected successfully")
}
