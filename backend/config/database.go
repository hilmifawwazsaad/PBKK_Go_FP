package config

import (
	"backend/models"
	// "backend/database"
	"fmt"
	"os"

	"gorm.io/gorm"
	"gorm.io/driver/mysql"
)

func SetupDatabaseConnection() *gorm.DB {
	// Code for database connection
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	if dbUser == "" || dbPass == "" || dbHost == "" || dbPort == "" || dbName == "" {
		fmt.Println("DB configuration failed, environment variable not set")
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPass, dbHost, dbPort, dbName)
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	if err := db.AutoMigrate(
		models.User{},
		models.Category{},
		models.Book{},
		models.Transaction{},
	); err != nil {
		fmt.Println(err)
		panic(err)
	}

	return db
}

func CloseDatabaseConnection(db *gorm.DB) {
	// Code for closing database connection
	dbSQL, err := db.DB()
	if err != nil {
		fmt.Println(err)
	}

	dbSQL.Close()
}
