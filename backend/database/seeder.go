package database

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"backend/models"

	"gorm.io/gorm"

)

func UserSeeder(db *gorm.DB) error {
	// Membuka file user.json untuk membaca data
	file, err := os.Open("database/data/user.json")
	if err != nil {
		log.Printf("Error opening user file: %v", err)
		return err
	}
	defer file.Close()

	// Membaca isi file
	data, err := ioutil.ReadAll(file)
	if err != nil {
		log.Printf("Error reading user file: %v", err)
		return err
	}

	// Mengunmarshal data JSON menjadi slice struct User
	var users []models.User
	err = json.Unmarshal(data, &users)
	if err != nil {
		log.Printf("Error unmarshalling user data: %v", err)
		return err
	}

	// Menyimpan setiap user ke database
	for _, user := range users {
		if err := db.Create(&user).Error; err != nil {
			log.Printf("Error seeding user: %v", err)
			return err
		}
	}

	log.Println("User seeding completed.")
	return nil
}
