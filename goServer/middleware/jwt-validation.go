package middleware

import (
	"encoding/json"
	"fmt"
	"pos/pkg/models"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func IsExpired(dateString interface{}) bool {
	var tm time.Time
	switch dateString := dateString.(type) {
	case float64:
		tm = time.Unix(int64(dateString), 0)
	case json.Number:
		v, _ := dateString.Int64()
		tm = time.Unix(v, 0)
	}
	timeNow := time.Unix(time.Now().Unix(), 0)
	fmt.Print(tm, " ", timeNow, " ", timeNow.Unix() > tm.Unix())
	return timeNow.Unix() > tm.Unix()
}

func VerifyToken(token string) (*jwt.Token, jwt.MapClaims, error) {
	claims := jwt.MapClaims{}
	parsedToken, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(models.MySigningKey), nil
	})

	return parsedToken, claims, err
}
