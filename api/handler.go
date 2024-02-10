package main

import (
	"net/http"
	"strconv"
	"time"

	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"

	"github.com/gin-gonic/gin"
)

type RegisterRequest struct {
	ID               uint   `json:"id"`
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
	TokenID    int       `gorm:"primaryKey;autoIncrement" json:"tokenId"`
	Token      string    `gorm:"type:varchar(255);not null;unique"`
	UserID     uint      `gorm:"not null" json:"userId"`
	ExpiryDate time.Time `gorm:"not null" json:"expiryDate"`
}

type RegisterResponse struct {
	UserID string `json:"userId"`
	Token  string `json:"token"`
}

// Userの認証情報を表す構造体
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// ログイン成功時のレスポンスを表す構造体
type LoginResponse struct {
	UserId string `json:"userId"`
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
	hash := sha256.Sum256([]byte(password))
	hashStr := hex.EncodeToString(hash[:])
	return hashStr, nil
}

func (h *Handler) RegisterUser(c *gin.Context) {
	var req RegisterRequest
	if err := c.BindJSON(&req); err != nil {
		println(err)
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
		ID:               req.ID,
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

	// // トークンの有効期限を設定(1ヶ月)、長いので2時間にした
	// expiryDate := time.Now().AddDate(0, 1, 0)
	// トークンの有効期限を設定(2時間)
	expiryDate := time.Now().Add(2 * time.Hour)

	// トークンをaccess_tokenテーブルに保存
	access_token := AccessToken{
		UserID:     user.ID,
		Token:      token,
		ExpiryDate: expiryDate,
	}
	if err := h.db.Create(&access_token).Error; err != nil {
		c.SecureJSON(http.StatusInternalServerError, gin.H{"error": "トークンの保存に失敗しました。"})
	}

	// 成功した場合のレスポンス
	c.SecureJSON(http.StatusOK, RegisterResponse{
		UserID: strconv.FormatUint(uint64(user.ID), 10), // uintからstringへの変換
		Token:  token,
	})
}

// ログイン関連の関数
func (h *Handler) findUserByEmail(email string) (*User, error) {
	var user User
	result := h.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

func (h *Handler) LoginUser(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.SecureJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// データベースからユーザー情報を取得
	user, err := h.findUserByEmail(req.Email)
	if err != nil {
		c.SecureJSON(http.StatusUnauthorized, gin.H{"error": "認証情報が無効です"})
		return
	}

	// パスワードのハッシュ値を比較
	hashedInputPW, _ := hashPW(req.Password)
	if user.Password != hashedInputPW {
		c.SecureJSON(http.StatusUnauthorized, gin.H{"error": "認証情報が無効です"})
		return
	}

	// トークンの生成と返却
	token, err := generateToken()
	if err != nil {
		c.SecureJSON(http.StatusInternalServerError, gin.H{"error": "トークンの生成に失敗しました"})
		return
	}

	// トークンの有効期限を設定
	expiryDate := time.Now().Add(2 * time.Hour)

	// アクセストークンをデータベースに保存;一応通すように実装したけど保持しなくてもいいらしい(*内部で解決するので)
	accessToken := AccessToken{
		UserID:     user.ID,
		Token:      token,
		ExpiryDate: expiryDate,
	}
	if err := h.db.Create(&accessToken).Error; err != nil {
		c.SecureJSON(http.StatusInternalServerError, gin.H{"error": "トークンの保存に失敗しました"})
		return
	}
	c.SecureJSON(http.StatusOK, LoginResponse{
		UserId: strconv.Itoa(int(user.ID)), // uintからstringへの変換
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
