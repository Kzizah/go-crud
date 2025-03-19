package backend

import (
	"go-crud/config"
	"go-crud/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Create Supplier
func CreateSupplier(c *gin.Context) {
	var supplier models.Supplier
	if err := c.ShouldBindJSON(&supplier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&supplier)
	c.JSON(http.StatusOK, supplier)
}

// Get All Suppliers
// Get All Suppliers
func GetSuppliers(c *gin.Context) {
	var suppliers []models.Supplier
	result := config.DB.Find(&suppliers)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, suppliers)
}
// Get Supplier by ID
func GetSupplier(c *gin.Context) {
	id := c.Param("id")
	var supplier models.Supplier
	if err := config.DB.First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Supplier not found"})
		return
	}
	c.JSON(http.StatusOK, supplier)
}

// Update Supplier
func UpdateSupplier(c *gin.Context) {
	id := c.Param("id")
	var supplier models.Supplier
	if err := config.DB.First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Supplier not found"})
		return
	}
	if err := c.ShouldBindJSON(&supplier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&supplier)
	c.JSON(http.StatusOK, supplier)
}

// Delete Supplier
func DeleteSupplier(c *gin.Context) {
	id := c.Param("id")
	var supplier models.Supplier
	if err := config.DB.First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Supplier not found"})
		return
	}
	config.DB.Delete(&supplier)
	c.JSON(http.StatusOK, gin.H{"message": "Supplier deleted"})
}
