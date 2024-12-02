package models

type Book struct {
	ID            uint          `gorm:"primaryKey" json:"id"`
	CategoryID    uint          `gorm:"not null" json:"category_id"`
	Judul         string        `gorm:"not null" json:"judul"`
	Penulis       string        `gorm:"type:varchar(255);not null" json:"penulis"`
	TahunTerbit   int           `gorm:"type:integer;not null" json:"tahun_terbit"`
	JumlahHalaman int           `gorm:"type:integer;not null" json:"jumlah_halaman"`
	BahasaBuku    string        `gorm:"type:varchar(20);not null" json:"bahasa_buku"`
	Stok          int           `gorm:"type:integer" json:"stok"`
	Transaction   []Transaction `gorm:"foreignKey:BookID" json:"transaction"`

	Timestamp
}
