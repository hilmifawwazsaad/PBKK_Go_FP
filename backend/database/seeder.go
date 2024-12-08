package database

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"gorm.io/gorm"
)

func Seeder(db *gorm.DB) error {

	if err := seedDataFromFile(db, "database/data/user.json", &[]models.User{}, "users"); err != nil {
		return fmt.Errorf("error seeding users: %v", err)
	}

	if err := seedDataFromFile(db, "database/data/category.json", &[]models.Category{}, "categories"); err != nil {
		return fmt.Errorf("error seeding categories: %v", err)
	}

	if err := seedDataFromFile(db, "database/data/book.json", &[]models.Book{}, "books"); err != nil {
		return fmt.Errorf("error seeding books: %v", err)
	}

	if err := seedDataFromFile(db, "database/data/transaction.json", &[]models.Transaction{}, "transactions"); err != nil {
		return fmt.Errorf("error seeding transactions: %v", err)
	}

	log.Println("Seeding completed successfully.")
	return nil
}

func seedDataFromFile(db *gorm.DB, filePath string, model interface{}, tableName string) error {
	// Optionally, delete existing records in the table
	// if err := db.Exec(fmt.Sprintf("DELETE FROM %s", tableName)).Error; err != nil {
	// 	return fmt.Errorf("error deleting from table %s: %v", tableName, err)
	// }

	file, err := os.Open(filePath)
	if err != nil {
		log.Printf("Error opening file %s: %v", filePath, err)
		return err
	}
	defer file.Close()

	data, err := ioutil.ReadAll(file)
	if err != nil {
		log.Printf("Error reading file %s: %v", filePath, err)
		return err
	}

	err = json.Unmarshal(data, &model)
	if err != nil {
		log.Printf("Error unmarshalling data from file %s: %v", filePath, err)
		return err
	}

	// Use Save for insert or update (upsert)
	if err := db.Save(model).Error; err != nil {
		log.Printf("Error inserting or updating data into table %s: %v", tableName, err)
		return err
	}

	/*if err := db.CreateInBatches(model, 100).Error; err != nil {
		log.Printf("Error inserting data into table %s: %v", tableName, err)
		return err
	}*/

	log.Printf("%s seeding completed.", tableName)
	return nil
}
