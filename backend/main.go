package main

import (
	"backend/config"
	"backend/routes"
	// "backend/database"
	"backend/controllers"
	// "backend/models"
	// "fmt"
	// "log"
	"os"

	// "backend/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	// "gorm.io/gorm"
)

func main() {
	if err := godotenv.Load(); err != nil {
		panic("Error loading .env file")
	}

	db := config.SetupDatabaseConnection()
	defer config.CloseDatabaseConnection(db)

	server := gin.Default()

	routes.UserRoutes(server, UserController)
	routes.BookRoutes(server, BookController)
	routes.CategoryRoutes(server, CategoryController)
	routes.TransactionRoutes(server, TransactionController)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	server.Run("127.0.0.1:" + port)
}