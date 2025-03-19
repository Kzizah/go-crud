package backend

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"time"
     
	 
     

)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8081"}, // Adjust based on your frontend port
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Category Routes
	r.POST("/categories", CreateCategory)
	r.GET("/categories", GetCategories)
	r.GET("/categories/:id", GetCategory)    // View
	r.PUT("/categories/:id", UpdateCategory) // Edit
	r.DELETE("/categories/:id", DeleteCategory) // Delete

	// Supplier Routes
	r.POST("/suppliers", CreateSupplier)
	r.GET("/suppliers", GetSuppliers)
	r.GET("/suppliers/:id", GetSupplier)
	r.PUT("/suppliers/:id", UpdateSupplier)
	r.DELETE("/suppliers/:id", DeleteSupplier)

/// Product Routes - FIXED (No need for "backend." prefix)
    
    r.POST("/products", CreateProduct)
    r.GET("/products", GetProducts)
    r.GET("/products/:id", GetProduct)
    r.PUT("/products/:id", UpdateProduct)
    r.DELETE("/products/:id", DeleteProduct)


	return r
}
