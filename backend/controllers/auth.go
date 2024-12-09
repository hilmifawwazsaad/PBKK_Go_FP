package controllers

import (
	"backend/config"
	"backend/models"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateJWT(user models.User) (string, error) {
	claims := jwt.MapClaims{
		"id":    user.ID,
		"email": user.Email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Gantilah dengan pemanggilan config.GetJWTKey()
	tokenString, err := token.SignedString([]byte(config.GetJWTKey()))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
