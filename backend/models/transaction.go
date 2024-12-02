package models

import "time"

type Transaction struct {
	ID             uint      `gorm:"primaryKey"`
	UserID         uint      `gorm:"not null"`
	BookID         uint      `gorm:"not null"`
	TanggalPinjam  time.Time `gorm:"type:date;not null"`
	TanggalKembali time.Time `gorm:"type:date;not null"`

	Timestamp
}
