package controllers

import (
	"backend/models"
	"net/http"
	"log"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BookController struct {
	DB *gorm.DB
}


// GetAllBooks: Mengambil semua data buku
func (bc *BookController) GetAllBooks(c *gin.Context) {
	var books []models.Book
	if err := bc.DB.Find(&books).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching books"})
		return
	}
	c.JSON(http.StatusOK, books)
}


// GetBookByID: Mengambil data buku berdasarkan ID
func (bc *BookController) GetBookByID(c *gin.Context) {
	id := c.Param("id")
	var book models.Book
	if err := bc.DB.First(&book, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}
	c.JSON(http.StatusOK, book)
}


// AddBook: Menambahkan data buku baru
func (bc *BookController) AddBook(c *gin.Context) {
	var book models.Book
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	log.Printf("Received book data: %+v", book)
	// Menambahkan buku baru
	if err := bc.DB.Create(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating book"})
		return
	}

	c.JSON(http.StatusCreated, book)
}


// UpdateBook: Memperbarui data buku berdasarkan ID
func (bc *BookController) UpdateBook(c *gin.Context) {
	id := c.Param("id")
	var book models.Book
	if err := bc.DB.First(&book, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Memperbarui data buku
	if err := bc.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating book"})
		return
	}

	c.JSON(http.StatusOK, book)
}


// DeleteBook: Menghapus data buku berdasarkan ID
func (bc *BookController) DeleteBook(c *gin.Context) {
	id := c.Param("id")
	var book models.Book
	if err := bc.DB.First(&book, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	if err := bc.DB.Delete(&book, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting book"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book deleted successfully"})
}
