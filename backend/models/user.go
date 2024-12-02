package models

type User struct {
	ID           uint          `gorm:"primaryKey"`
	Nama         string        `gorm:"type:varchar(255);not null"`
	JenisKelamin bool          `gorm:"not null"`
	NomorTelepon string        `gorm:"type:varchar(13);not null"`
	Email        string        `gorm:"type:varchar(50);not null"`
	Alamat       string        `gorm:"not null"`
	UserType     string        `gorm:"type:varchar(20);not null"`
	Password     string        `gorm:"type:varchar(50);not null"`
	Transaction  []Transaction `gorm:"foreignKey:UserID"`

	Timestamp
}

// func (User) BeforeCreate() string {
// 	return "user"
// }
