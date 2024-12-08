package main

import (
	"backend/config"
	"backend/middleware"
	"backend/routes"

	// "fmt"
	// "backend/routes"
	"backend/controllers"
	"backend/database"

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
	server.Use(middleware.CORSMiddleware())
	// routes.UserRoutes(server, UserController)
	// routes.BookRoutes(server, bookController)
	// routes.CategoryRoutes(server, categoryController)
	// routes.TransactionRoutes(server, transactionController)

	// Inisialisasi BookController dengan menghubungkannya ke database
	userController := &controllers.UserController{DB: db}
	bookController := &controllers.BookController{DB: db}

	// Memanggil BookRoutes untuk menambahkan route /books
	routes.UserRoutes(server, userController)
	routes.BookRoutes(server, bookController)

	// Apply AuthMiddleware on routes that need authentication
	protected := server.Group("/protected")
	protected.Use(middleware.AuthMiddleware()) // Apply AuthMiddleware globally to this group

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
		port = "8081"
	}
	server.Run("127.0.0.1:" + port)
}
