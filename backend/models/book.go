package models

type Book struct {
	ID            uint          `gorm:"primaryKey"`
	CategoryID    uint          `gorm:"not null"`
	Judul         string        `gorm:"not null"`
	Penulis       string        `gorm:"type:varchar(255);not null"`
	TahunTerbit   int           `gorm:"type:integer;not null"`
	JumlahHalaman int           `gorm:"type:integer;not null"`
	BahasaBuku    string        `gorm:"type:varchar(20);not null"`
	Stok          int           `gorm:"type:integer"`
	Transaction   []Transaction `gorm:"foreignKey:BookID"`

	Timestamp
}
