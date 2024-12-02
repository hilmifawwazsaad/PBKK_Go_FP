package models

type Category struct {
	ID   uint   `gorm:"primaryKey"`
	Nama string `gorm:"type:varchar(50);not null"`
	Book []Book `gorm:"foreignKey:CategoryID"`

	Timestamp
}
