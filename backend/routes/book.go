package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func BookRoutes(router *gin.Engine, BookController *controllers.BookController) {
	bookRoutes := router.Group("/books")
	{
		bookRoutes.GET("/books", BookController.GetAllBooks)
		bookRoutes.GET("/books/:id", BookController.GetBookByID)
		bookRoutes.POST("/books", BookController.AddBook)
		bookRoutes.PUT("/books/:id", BookController.UpdateBook)
		bookRoutes.DELETE("/books/:id", BookController.DeleteBook)
	}
}