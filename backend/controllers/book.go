package controllers

import (
	"backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
)

type BookController struct {
	DB *gorm.DB
}

// GetAllBooks: Mengambil semua data buku
func (bc *BookController) GetAllBooks(c *gin.Context) {
	var books []models.Book
	if err := bc.DB.Preload("Transaction").Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching books"})
		return
	}
	c.JSON(http.StatusOK, books)
}

// GetBookByID: Mengambil data buku berdasarkan ID
func (bc *BookController) GetBookByID(c *gin.Context) {
	id := c.Param("id")
	var book models.Book
	if err := bc.DB.Preload("Transaction").First(&book, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	c.JSON(http.StatusOK, book)
}

// AddBook: Menambahkan buku baru
func (bc *BookController) AddBook(c *gin.Context) {
	var book models.Book
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Validasi stok dan tahun terbit (misalnya tahun tidak boleh lebih dari tahun sekarang)
	if book.Stok < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Stok tidak valid"})
		return
	}

	if book.TahunTerbit > 2024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tahun terbit tidak valid"})
		return
	}

	if err := bc.DB.Create(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating book"})
		return
	}

	c.JSON(http.StatusCreated, book)
}

// UpdateBook: Mengubah data buku berdasarkan ID
func (bc *BookController) UpdateBook(c *gin.Context) {
	id := c.Param("id")
	var book models.Book
	if err := bc.DB.First(&book, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	// Bind data dari request body ke book
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Validasi stok dan tahun terbit (misalnya tahun tidak boleh lebih dari tahun sekarang)
	if book.Stok < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Stok tidak valid"})
		return
	}

	if book.TahunTerbit > 2024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tahun terbit tidak valid"})
		return
	}

	// Update data buku
	if err := bc.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating book"})
		return
	}

	c.JSON(http.StatusOK, book)
}

// DeleteBook: Menghapus buku berdasarkan ID
func (bc *BookController) DeleteBook(c *gin.Context) {
	id := c.Param("id")
	if err := bc.DB.Delete(&models.Book{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting book"})
		return
	}
	c.JSON(http.StatusNoContent, nil)
}