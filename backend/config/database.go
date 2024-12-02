package config

import (
	"backend/models"
	"log"

	// "backend/database"
	"fmt"
	"os"

	"github.com/joho/godotenv"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func SetupDatabaseConnection() *gorm.DB {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Code for database connection
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	fmt.Println("DB_USER:", dbUser)
	fmt.Println("DB_PASS:", dbPass)
	fmt.Println("DB_HOST:", dbHost)
	fmt.Println("DB_PORT:", dbPort)
	fmt.Println("DB_NAME:", dbName)

	if dbUser == "" || dbHost == "" || dbPort == "" || dbName == "" {
		fmt.Println("DB configuration failed, environment variable not set")
		panic("DB configuration failed, environment variable not set")
	}

	// dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPass, dbHost, dbPort)
	var dsn string
	if dbPass == "" {
		dsn = fmt.Sprintf("%s@tcp(%s:%s)/?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbHost, dbPort)
	} else {
		dsn = fmt.Sprintf("%s:%s@tcp(%s:%s)/?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPass, dbHost, dbPort)
	}
	
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	if err := createDatabaseIfNotExists(db, dbName); err != nil {
		fmt.Println("Error creating database:", err)
		panic(err)
	}

	db.Exec("USE " + dbName)

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

func createDatabaseIfNotExists(db *gorm.DB, dbName string) error {
	// Periksa apakah database sudah ada, jika belum buat
	var exists bool
	err := db.Raw("SELECT COUNT(*) > 0 FROM information_schema.schemata WHERE schema_name = ?", os.Getenv("DB_NAME")).Scan(&exists).Error
	if err != nil {
		return err
	}

	// Jika database belum ada, buat database baru
	if !exists {
		if err := db.Exec("CREATE DATABASE " + dbName).Error; err != nil {
			return fmt.Errorf("failed to create database: %v", err)
		}
	}
	return nil
}

func CloseDatabaseConnection(db *gorm.DB) {
	// Code for closing database connection
	dbSQL, err := db.DB()
	if err != nil {
		fmt.Println(err)
	}

	dbSQL.Close()
}
