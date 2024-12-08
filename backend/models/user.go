package models

type User struct {
	ID           uint          `gorm:"primaryKey" json:"id"`
	Nama         string        `gorm:"type:varchar(255);not null" json:"nama"`
	JenisKelamin bool          `gorm:"not null" json:"jenis_kelamin"`
	NomorTelepon string        `gorm:"type:varchar(13);not null" json:"nomor_telepon"`
	Email        string        `gorm:"type:varchar(50);not null; unique" json:"email"`
	Alamat       string        `gorm:"not null" json:"alamat"`
	UserType     string        `gorm:"type:varchar(20);not null" json:"user_type"`
	Password     string        `gorm:"type:varchar(255);not null" json:"password"`
	Transaction  []Transaction `gorm:"foreignKey:UserID" json:"transaction"`

	Timestamp
}

// func (User) BeforeCreate() string {
// 	return "user"
// }
