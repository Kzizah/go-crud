package backend

import (
	"go-crud/config"
	"go-crud/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Create Category
func CreateCategory(c *gin.Context) {
	var category models.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Create(&category)
	c.JSON(http.StatusOK, category)
}

// Get All Categories
func GetCategories(c *gin.Context) {
	var categories []models.Category
	config.DB.Find(&categories)
	c.JSON(http.StatusOK, categories)
}

// Get Single Category
func GetCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category
	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	c.JSON(http.StatusOK, category)
}

// Update Category
func UpdateCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category
	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	config.DB.Save(&category)
	c.JSON(http.StatusOK, category)
}

// Delete Category
func DeleteCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category
	if err := config.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	config.DB.Delete(&category)
	c.JSON(http.StatusOK, gin.H{"message": "Category deleted successfully"})
}
