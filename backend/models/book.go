package models

import (
	"gorm.io/gorm"
)

type Book struct {
	ID            uint          `gorm:"primaryKey" json:"id"`
	CategoryID    uint          `gorm:"not null;constraint:OnDelete:RESTRICT;OnUpdate:CASCADE;" json:"category_id"`
	Judul         string        `gorm:"not null" json:"judul"`
	Penulis       string        `gorm:"type:varchar(255);not null" json:"penulis"`
	TahunTerbit   int           `gorm:"type:integer;not null" json:"tahun_terbit"`
	JumlahHalaman int           `gorm:"type:integer;not null" json:"jumlah_halaman"`
	BahasaBuku    string        `gorm:"type:varchar(20);not null" json:"bahasa_buku"`
	Stok          int           `gorm:"type:integer" json:"stok"`
	Category      Category      `gorm:"foreignKey:CategoryID" json:"category"`
	Transaction   []Transaction `gorm:"foreignKey:BookID" json:"transaction"`

	Timestamp
}

func GetBookByID(db *gorm.DB, id int) (Book, error) {
	var book Book
	if err := db.First(&book, id).Error; err != nil {
		return book, err
	}
	return book, nil
}

func UpdateBook(db *gorm.DB, book Book) error {
	if err := db.Save(&book).Error; err != nil {
		return err
	}
	return nil
}

func DeleteBook(db *gorm.DB, id int) error {
	if err := db.Delete(&Book{}, id).Error; err != nil {
		return err
	}
	return nil
}
