package main

import (
	"backend/config"
	"backend/controllers"
	"backend/middleware"
	"backend/routes"

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
	server.Use(middleware.CORSMiddleware())
	// routes.UserRoutes(server, UserController)
	// routes.BookRoutes(server, bookController)
	// routes.CategoryRoutes(server, categoryController)
	// routes.TransactionRoutes(server, transactionController)

	// Inisialisasi BookController dengan menghubungkannya ke database
	userController := &controllers.UserController{DB: db}
	bookController := &controllers.BookController{DB: db}
	transactionController := &controllers.TransactionController{DB: db}
	categoryController := &controllers.CategoryController{DB: db}

	// Memanggil BookRoutes untuk menambahkan route /books
	routes.UserRoutes(server, userController)
	routes.BookRoutes(server, bookController)
	routes.TransactionRoutes(server, transactionController)
	routes.CategoryRoutes(server, categoryController)

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
