package models

import (
	"time"
	"gorm.io/gorm"
)


type Transaction struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	UserID         uint      `gorm:"not null;constraint:OnDelete:RESTRICT;OnUpdate:CASCADE;" json:"user_id"`
	BookID         uint      `gorm:"not null;constraint:OnDelete:RESTRICT;OnUpdate:CASCADE;" json:"book_id"`
	TanggalPinjam  time.Time `gorm:"type:date;not null" json:"tanggal_pinjam"`
	TanggalKembali time.Time `gorm:"type:date;not null" json:"tanggal_kembali"`

	User User `gorm:"foreignKey:UserID" json:"user"`
    Book Book `gorm:"foreignKey:BookID" json:"book"`

	Timestamp
}

func GetTransactionByID(db *gorm.DB, id int) (Transaction, error) {
	var transaction Transaction
	if err := db.First(&transaction, id).Error; err != nil {
		return transaction, err
	}
	return transaction, nil
}

func UpdateTransaction(db *gorm.DB, transaction Transaction) error {
	if err := db.Save(&transaction).Error; err != nil {
		return err
	}
	return nil
}

func DeleteTransaction(db *gorm.DB, id int) error {
	if err := db.Delete(&Transaction{}, id).Error; err != nil {
		return err
	}
	return nil
}
