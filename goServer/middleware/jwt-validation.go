package middleware

import (
	"github.com/dgrijalva/jwt-go"
	"pos/pkg/models"
)

func VerifyToken(token string) (*jwt.Token, jwt.MapClaims, error) {
	claims := jwt.MapClaims{}
	parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(models.MySigningKey), nil
	})

	return parsedToken, claims, err
}
