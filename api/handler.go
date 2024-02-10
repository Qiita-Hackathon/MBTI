package main

import (
	"net/http"
	"strconv"
	"time"

	"crypto/rand"
	"encoding/hex"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	UserName         string `json:"userName" binding:"required"`
	Email            string `json:"email" binding:"required"`
	Password         string `json:"password" binding:"required"`
	Age              int    `json:"age" binding:"required"`
	Gender           int    `json:"gender" binding:"required"`
	Occupation       string `json:"occupation" binding:"required"`
	SelfIntroduction string `json:"selfIntroduction" binding:"required"`
	IconPath         string `gorm:"type:varchar(255);" json:"iconPath"`
	Mbti             int    `gorm:"not null" json:"mbti"`
}

type AccessToken struct {
	ID         int       `json:"userId"`
	Token      string    `gorm:"type:varchar(255);not null;unique"`
	UserID     uint      `gorm:"not null"`
	ExpiryDate time.Time `gorm:"not null"`
}

type RegisterResponse struct {
	UserID string `json:"userId"`
	Token  string `json:"token"`
}

// ここからユーザ登録に関連するメソッド等の処理実装
func generateToken() (string, error) {
	bytes := make([]byte, 16) // 16バイトのランダムな値を生成
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil // バイト列を16進数の文字列に変換
}

func hashPW(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func (h *Handler) RegisterUser(c *gin.Context) {
	var req RegisterRequest
	if err := c.BindJSON(&req); err != nil {
		c.SecureJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// パスワードのハッシュ化
	hashedpw, err := hashPW(req.Password)
	if err != nil {
		c.SecureJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// データベースにユーザー情報を保存
	// Userインスタンスの生成
	user := User{
		UserName:         req.UserName,
		Email:            req.Email,
		Password:         hashedpw, // l:53でハッシュ化したPWを格納
		Age:              req.Age,
		Gender:           req.Gender,
		Occupation:       req.Occupation,
		SelfIntroduction: req.SelfIntroduction,
		IconPath:         req.IconPath,
		Mbti:             req.Mbti,
	}

	// DBにユーザ情報を保存
	result := h.db.Create(&user)
	if result.Error != nil {
		c.SecureJSON(http.StatusInternalServerError, gin.H{"error": "データベースへの保存に失敗しました。"})
		return
	}

	// トークンの生成
	token, err := generateToken()
	if err != nil {
		c.SecureJSON(http.StatusInternalServerError, gin.H{"error": "トークンの生成に失敗しました。"})
		return
	}

	// トークンの有効期限を設定(1週間)
	expiryDate := time.Now().AddDate(0, 1, 0)

	// トークンをaccess_tokenテーブルに保存
	accessToken := AccessToken{
		UserID:     user.ID,
		Token:      token,
		ExpiryDate: expiryDate,
	}
	if err := h.db.Create(&accessToken).Error; err != nil {
		c.SecureJSON(http.StatusInternalServerError, gin.H{"error": "トークンの保存に失敗しました。"})
	}

	// 成功した場合のレスポンス
	c.SecureJSON(http.StatusOK, RegisterResponse{
		UserID: strconv.FormatUint(uint64(user.ID), 10), // uintからstringへの変換
		Token:  token,
	})
}

// パラメータを利用してDBからユーザ情報を取得する関数

// 【セキュリティの問題からこのAPIは提供するべきではない。】
// ユーザのトークンを取得するためのAPIエンドポイント処理実装
// func (h *Handler) GetUserToken(c *gin.Context) {
// 	userID := c.Param("userID")

// 	var accessToken AccessToken
// 	if err := h.db.Where("user_id = ?", userID).First(&accessToken).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "トークンが見つかりません。"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"token": accessToken.Token})
// }
