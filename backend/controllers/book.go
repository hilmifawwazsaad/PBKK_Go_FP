package controllers

import (
	"backend/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BookController struct {
	DB *gorm.DB
}

func (controller *BookController) GetAllBooks(c *gin.Context) {
	// Logika untuk mengambil semua buku
	// c.JSON(http.StatusOK, books) // Pastikan Anda mengembalikan respons yang sesuai
}

// Helper untuk mengirim respon error
func sendErrorResponse(c *gin.Context, statusCode int, message string) {
	c.JSON(statusCode, gin.H{"error": message})
}

// Validasi input buku
func validateBookInput(book *models.Book) string {
	if book.Stok < 0 {
		return "Stok tidak valid"
	}
	if book.TahunTerbit > 2024 {
		return "Tahun terbit tidak valid"
	}
	if book.JumlahHalaman <= 0 {
		return "Jumlah halaman tidak valid"
	}
	if book.BahasaBuku == "" {
		return "Bahasa buku tidak boleh kosong"
	}
	return ""
}

// GetAllBooks: Mengambil semua data buku
// func (bc *BookController) GetAllBooks(c *gin.Context) {
// 	var books []models.Book
// 	if err := bc.DB.Preload("Transaction").Find(&books).Error; err != nil {
// 		sendErrorResponse(c, http.StatusInternalServerError, "Error fetching books")
// 		return
// 	}
// 	c.JSON(http.StatusOK, books)
// }

// GetBookByID: Mengambil data buku berdasarkan ID
func (bc *BookController) GetBookByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		sendErrorResponse(c, http.StatusBadRequest, "Invalid book ID")
		return
	}

	var book models.Book
	if err := bc.DB.Preload("Transaction").First(&book, id).Error; err != nil {
		sendErrorResponse(c, http.StatusNotFound, "Book not found")
		return
	}
	c.JSON(http.StatusOK, book)
}

// AddBook: Menambahkan buku baru
func (bc *BookController) AddBook(c *gin.Context) {
	var book models.Book
	if err := c.ShouldBindJSON(&book); err != nil {
		sendErrorResponse(c, http.StatusBadRequest, "Invalid input")
		return
	}

	if validationMessage := validateBookInput(&book); validationMessage != "" {
		sendErrorResponse(c, http.StatusBadRequest, validationMessage)
		return
	}

	if err := bc.DB.Create(&book).Error; err != nil {
		sendErrorResponse(c, http.StatusInternalServerError, "Error creating book")
		return
	}

	c.JSON(http.StatusCreated, book)
}

// UpdateBook: Mengubah data buku berdasarkan ID
func (bc *BookController) UpdateBook(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		sendErrorResponse(c, http.StatusBadRequest, "Invalid book ID")
		return
	}

	var existingBook models.Book
	if err := bc.DB.First(&existingBook, id).Error; err != nil {
		sendErrorResponse(c, http.StatusNotFound, "Book not found")
		return
	}

	var updatedBook models.Book
	if err := c.ShouldBindJSON(&updatedBook); err != nil {
		sendErrorResponse(c, http.StatusBadRequest, "Invalid input")
		return
	}

	if validationMessage := validateBookInput(&updatedBook); validationMessage != "" {
		sendErrorResponse(c, http.StatusBadRequest, validationMessage)
		return
	}

	// Update hanya field tertentu
	existingBook.Judul = updatedBook.Judul
	existingBook.Penulis = updatedBook.Penulis
	existingBook.TahunTerbit = updatedBook.TahunTerbit
	existingBook.JumlahHalaman = updatedBook.JumlahHalaman
	existingBook.BahasaBuku = updatedBook.BahasaBuku
	existingBook.Stok = updatedBook.Stok
	existingBook.CategoryID = updatedBook.CategoryID

	if err := bc.DB.Save(&existingBook).Error; err != nil {
		sendErrorResponse(c, http.StatusInternalServerError, "Error updating book")
		return
	}

	c.JSON(http.StatusOK, existingBook)
}

// DeleteBook: Menghapus buku berdasarkan ID
func (bc *BookController) DeleteBook(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		sendErrorResponse(c, http.StatusBadRequest, "Invalid book ID")
		return
	}

	if err := bc.DB.Delete(&models.Book{}, id).Error; err != nil {
		sendErrorResponse(c, http.StatusInternalServerError, "Error deleting book")
		return
	}
	c.JSON(http.StatusNoContent, nil)
}
