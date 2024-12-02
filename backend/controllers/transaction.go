package controllers

import (
	"backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"time"
)

type TransactionController struct {
	DB *gorm.DB
}

// GetAllTransactions: Mengambil semua transaksi
func (tc *TransactionController) GetAllTransactions(c *gin.Context) {
	var transactions []models.Transaction
	if err := tc.DB.Preload("Book").Preload("User").Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching transactions"})
		return
	}
	c.JSON(http.StatusOK, transactions)
}

// GetTransactionByID: Mengambil transaksi berdasarkan ID
func (tc *TransactionController) GetTransactionByID(c *gin.Context) {
	id := c.Param("id")
	var transaction models.Transaction
	if err := tc.DB.Preload("Book").Preload("User").First(&transaction, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}
	c.JSON(http.StatusOK, transaction)
}

// AddTransaction: Menambahkan transaksi peminjaman buku
func (tc *TransactionController) AddTransaction(c *gin.Context) {
	var transaction models.Transaction
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Validasi jika stok buku cukup untuk dipinjam
	var book models.Book
	if err := tc.DB.First(&book, transaction.BookID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	if book.Stok <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not enough stock available"})
		return
	}

	// Mengurangi stok buku
	book.Stok -= 1
	if err := tc.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating book stock"})
		return
	}

	// Menambahkan transaksi
	transaction.TanggalPinjam = time.Now()
	if err := tc.DB.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating transaction"})
		return
	}

	c.JSON(http.StatusCreated, transaction)
}

// UpdateTransaction: Mengubah transaksi peminjaman buku
func (tc *TransactionController) UpdateTransaction(c *gin.Context) {
	id := c.Param("id")
	var transaction models.Transaction
	if err := tc.DB.First(&transaction, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	// Bind data dari request body ke transaksi
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Mengupdate transaksi
	if err := tc.DB.Save(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating transaction"})
		return
	}

	c.JSON(http.StatusOK, transaction)
}

// DeleteTransaction: Menghapus transaksi peminjaman buku
func (tc *TransactionController) DeleteTransaction(c *gin.Context) {
	id := c.Param("id")
	var transaction models.Transaction
	if err := tc.DB.First(&transaction, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	// Mengembalikan stok buku saat transaksi dihapus
	var book models.Book
	if err := tc.DB.First(&book, transaction.BookID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching book data"})
		return
	}

	// Menambah stok buku yang telah dipinjam kembali
	book.Stok += 1
	if err := tc.DB.Save(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating book stock"})
		return
	}

	// Menghapus transaksi
	if err := tc.DB.Delete(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting transaction"})
		return
	}

	c.JSON(http.StatusNoContent, nil)
}