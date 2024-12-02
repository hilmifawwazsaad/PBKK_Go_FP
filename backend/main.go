package main

import (
	"backend/config"
	// "fmt"
	// "backend/routes"
	"backend/database"
	// "backend/controllers"
	// "backend/models"
	// "fmt"
	"log"
	"os"

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

	// routes.UserRoutes(server, UserController)
	// routes.BookRoutes(server, bookController)
	// routes.CategoryRoutes(server, categoryController)
	// routes.TransactionRoutes(server, transactionController)

	if err := database.Migrate(db); err != nil {
		log.Fatalf("Error migrating database: %v", err)
		panic(err)
	}

	if err := database.Seeder(db); err != nil {
		log.Fatalf("Error seeding data: %v", err)
		panic(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	server.Run("127.0.0.1:" + port)
}
