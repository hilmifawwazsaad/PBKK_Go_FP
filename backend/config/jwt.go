package config

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// Secret Key
var jwtKey = []byte("pinjem_buku")

type JWTClaim struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

// GenerateJWT generates a JWT token
func GenerateJWT(userID uint, email string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // Token berlaku 1 hari
	claims := &JWTClaim{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

// ValidateJWT validates a JWT token
func ValidateJWT(tokenStr string) (*JWTClaim, error) {
	claims := &JWTClaim{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}
