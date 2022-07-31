package models

import (
	"errors"
	"fmt"
	"pos/pkg/config"
	"regexp"
	"time"
	"unicode"

	jwt "github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"

	"github.com/jinzhu/gorm"
)

var db *gorm.DB
var mySigningKey = []byte("mysupersecretphrase")

type User struct {
	gorm.Model
	Email     string `json:"email"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Password  string `json:"password"`
	Active    bool   `json:"active"`
	Admin     bool   `json:"admin"`
	Owner     bool   `json:"owner"`
	Shop_id   uint   `gorm: "foreignKey : shop_id" json: shop`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Address{}, &User{}, &Shop{})
	db.Debug().Model(&Shop{}).AddForeignKey("addresses_id", "addresses(id)", "cascade", "cascade")

	db.Debug().Model(&User{}).AddForeignKey("shop_id", "shops(id)", "cascade", "cascade")
}

func CreateUser(u *User) *User {
	db.NewRecord(u)
	db.Create(u)
	return u
}
func FindUserByEmail(Email string) bool {
	var result struct {
		Found bool
	}
	db.Raw("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS found",
		Email).Scan(&result)
	if result.Found {
		fmt.Println("found")
	} else {
		fmt.Println("not found")
	}
	return result.Found
}

func IsEmailValid(e string) bool {
	emailRegex := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return emailRegex.MatchString(e)
}
func IsValidPassword(s string) bool {
	var (
		hasMinLen = false
		hasUpper  = false
		hasLower  = false
		hasNumber = false
	)
	if len(s) >= 8 {
		hasMinLen = true
	}
	for _, char := range s {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsNumber(char):
			hasNumber = true
		}
	}
	return hasMinLen && hasUpper && hasLower && hasNumber
}
func HashPassword(password string) string {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes)
}
func GenerateJwt(user *User) (string, error) {
	shop := GetShop(user.Shop_id)

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["firstName"] = user.FirstName
	claims["lastName"] = user.LastName
	claims["email"] = user.Email
	claims["active"] = user.Active
	claims["owner"] = user.Owner
	claims["shopName"] = shop.ShopName
	claims["exp"] = time.Now().Add(time.Hour * 100).Unix()
	tokenString, err := token.SignedString(mySigningKey)
	if err != nil {
		fmt.Errorf("Something went wrong: %v", err.Error())
		return "", err
	}
	return tokenString, nil
}
func GetUserByEmail(email string) (*User, error) {
	var User User
	db.Find(&User, "email = ?", email)
	if User.Email == "" {
		err := errors.New("no user")
		return &User, err
	}
	return &User, errors.New("nil")
}
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
