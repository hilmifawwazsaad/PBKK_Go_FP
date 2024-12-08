package models

import (
	"gorm.io/gorm"
)

type User struct {
	ID           uint          `gorm:"primaryKey" json:"id"`
	Nama         string        `gorm:"type:varchar(255);not null" json:"nama"`
	JenisKelamin bool          `gorm:"not null" json:"jenis_kelamin"`
	NomorTelepon string        `gorm:"type:varchar(13);not null" json:"nomor_telepon"`
	Email        string        `gorm:"type:varchar(50);not null" json:"email"`
	Alamat       string        `gorm:"not null" json:"alamat"`
	UserType     string        `gorm:"type:varchar(20);not null" json:"user_type"`
	Password     string        `gorm:"type:varchar(50);not null" json:"password"`
	Transaction  []Transaction `gorm:"foreignKey:UserID" json:"transaction"`

	Timestamp
}

func GetUserByID(db *gorm.DB, id int) (User, error) {
	var user User
	if err := db.First(&user, id).Error; err != nil {
		return user, err
	}
	return user, nil
}

func UpdateUser(db *gorm.DB, user User) error {
	if err := db.Save(&user).Error; err != nil {
		return err
	}
	return nil
}

func DeleteUser(db *gorm.DB, id int) error {
	if err := db.Delete(&User{}, id).Error; err != nil {
		return err
	}
	return nil
}

