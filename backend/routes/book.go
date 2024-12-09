package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func BookRoutes(router *gin.Engine, bookController *controllers.BookController) {
	bookRoutes := router.Group("/books")
	{
		bookRoutes.GET("/books", bookController.GetAllBooks)      // Mengambil semua buku
		bookRoutes.GET("/book/:id", bookController.GetBookByID)   // Mengambil buku berdasarkan ID
		bookRoutes.POST("/add", bookController.AddBook)         // Menambahkan buku baru
		bookRoutes.PUT("/edit/:id", bookController.UpdateBook)    // Memperbarui buku berdasarkan ID
		bookRoutes.DELETE("/delete/:id", bookController.DeleteBook) // Menghapus buku berdasarkan ID
	}
}
