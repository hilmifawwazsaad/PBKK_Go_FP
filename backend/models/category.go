package models

type Category struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Nama string `gorm:"type:varchar(50);not null" json:"nama"`
	Book []Book `gorm:"foreignKey:CategoryID" json:"book"`

	Timestamp
}
