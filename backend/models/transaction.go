package models

import "time"

type Transaction struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	UserID         uint      `gorm:"not null;constraint:OnDelete:RESTRICT;OnUpdate:CASCADE;" json:"user_id"`
	BookID         uint      `gorm:"not null;constraint:OnDelete:RESTRICT;OnUpdate:CASCADE;" json:"book_id"`
	TanggalPinjam  time.Time `gorm:"type:date;not null" json:"tanggal_pinjam"`
	TanggalKembali time.Time `gorm:"type:date;not null" json:"tanggal_kembali"`

	Timestamp
}
