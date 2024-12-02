package database

import (
	"backend/models"
	"fmt"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error{
	// Code for migrating the database
	if err := db.AutoMigrate(
		models.User{},
		models.Category{},
		models.Book{},
		models.Transaction{},
	); err != nil {
		fmt.Println(err)
		panic(err)
	}
	fmt.Println("Migration successful")

	return nil
}
