package models

import (
	"gorm.io/gorm"
)

type Category struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Nama string `gorm:"type:varchar(50);not null" json:"nama"`
	Book []Book `gorm:"foreignKey:CategoryID" json:"book"`

	Timestamp
}

func GetCategoryByID(db *gorm.DB, id int) (Category, error) {
	var category Category
	if err := db.First(&category, id).Error; err != nil {
		return category, err
	}
	return category, nil
}

func UpdateCategory(db *gorm.DB, category Category) error {
	if err := db.Save(&category).Error; err != nil {
		return err
	}
	return nil
}

func DeleteCategory(db *gorm.DB, id int) error {
	if err := db.Delete(&Category{}, id).Error; err != nil {
		return err
	}
	return nil
}