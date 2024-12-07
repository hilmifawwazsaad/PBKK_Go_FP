package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func BookRoutes(router *gin.Engine, bookController *controllers.BookController) {
	bookRoutes := router.Group("/books")
	{
		bookRoutes.GET("/", bookController.GetAllBooks)      // Mengambil semua buku
		bookRoutes.GET("/:id", bookController.GetBookByID)   // Mengambil buku berdasarkan ID
		bookRoutes.POST("/", bookController.AddBook)         // Menambahkan buku baru
		bookRoutes.PUT("/:id", bookController.UpdateBook)    // Memperbarui buku berdasarkan ID
		bookRoutes.DELETE("/:id", bookController.DeleteBook) // Menghapus buku berdasarkan ID
	}
}
