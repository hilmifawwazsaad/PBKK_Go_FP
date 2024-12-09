package controllers

import (
	"backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type CategoryController struct {
	DB *gorm.DB
}

// GetAllCategories: Mengambil semua kategori buku
func (cc *CategoryController) GetAllCategories(c *gin.Context) {
	var categories []models.Category
	if err := cc.DB.Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching categories"})
		return
	}
	c.JSON(http.StatusOK, categories)
}

// GetCategoryByID: Mengambil kategori buku berdasarkan ID
func (cc *CategoryController) GetCategoryByID() {
	// id := .Param("id")
	var category models.Category
	if err := cc.DB.Preload("Book").First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	c.JSON(http.StatusOK, category)
}

// AddCategory: Menambah kategori buku baru
func (cc *CategoryController) AddCategory(c *gin.Context) {
	var category models.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Menambahkan kategori baru
	if err := cc.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating category"})
		return
	}

	c.JSON(http.StatusCreated, category)
}

// UpdateCategory: Mengubah kategori buku berdasarkan ID
func (cc *CategoryController) UpdateCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category
	if err := cc.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	// Bind data dari request body ke kategori
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Mengupdate kategori
	if err := cc.DB.Save(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating category"})
		return
	}

	c.JSON(http.StatusOK, category)
}

// DeleteCategory: Menghapus kategori buku berdasarkan ID
func (cc *CategoryController) DeleteCategory(c *gin.Context) {
	id := c.Param("id")
	var category models.Category
	if err := cc.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	// Menghapus kategori
	if err := cc.DB.Delete(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting category"})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}