package common

type Restaurant struct {
	Id          int    `json:"id"`
	Email       string `json:"email"`
	Name        string `json:"name"`
	PhoneNumber string `json:"phone_number"`
	Address     string `json:"address"`
	Description string `json:"description"`
	Category    string `json:"category"`
}

type Menu struct {
	Id           int    `json:"id"`
	Name         string `json:"name"`
	Price        int    `json:"price"`
	Description  string `json:"description"`
	RestaurantId int    `json:"restaurant_id"`
	PhotoUrl     string `json:"photo_url"`
	Category     string `json:"category"`
	IsSoldOut    bool   `json:"is_sold_out"`
	LikeCount    int    `json:"like_count"`
}

type Category struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type CategoryResponse struct {
	CategoryName string     `json:"category_name"`
	Categories   []Category `json:"categories"`
}

type MenuSetResponse struct {
	Status  string `json:"status"`
	Yosan   int    `json:"yosan"`
	MenuSet []Menu `json:"menu_set"`
}

type LoginPost struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type SignupPost struct {
	Id          int    `json:"id"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	Name        string `json:"name"`
	PhoneNumber string `json:"phone_number"`
	Address     string `json:"address"`
	Description string `json:"description"`
	CategoryId  int    `json:"category_id"`
}

type User struct {
	UserId       int           `json:"id" gorm:"primary_key auto_increment"`
	UserName     string        `json:"userName" gorm:"not null"`
	Email        string        `json:"email" gorm:"not null unique"`
	Password     string        `json:"password" gorm:"not null"`
	Age          int           `json:"age" gorm:"not null"`
	Gender       int           `json:"gender" gorm:"not null"`
	Occupation   string        `json:"occupation" gorm:"default ''"`
	SelfIntro    string        `json:"selfIntroduction" gorm:"default ''"`
	IconPath     string        `json:"iconPath" gorm:"default ''"`
	Mbti         int           `json:"mbti" gorm:"not null"`
	CategoryTags []CategoryTag `json:"categoryTag" gorm:"many2many:category_tag"`
}

type CategoryTag struct {
	TagId         int    `json:"tagId" gorm:"primary_key auto_increment"`
	CategoryGroup string `json:"categoryGroup" gorm:"not null"`
	TagName       string `json:"tagName" gorm:"unique not null"`
	Users         []User `json:"users" gorm:"many2many:category_tag"`
}

type Profile struct {
	Id           int           `json:"id" gorm:"primary_key"`
	UserName     string        `json:"userName"`
	UserIcon     string        `json:"userIcon"`
	Mbti         string        `json:"mbti"`
	CategoryTags []CategoryTag `json:"categoryTag"`
}

type GetProfileAllRequest struct {
	MbtiId []int `json:"mbtiId"`
	TagId  []int `json:"tagId"`
}

type GetProfileAllResponse struct {
	Profiles []Profile `json:"profiles"`
}

type Mbti struct {
	MbtiId          int    `json:"mbtiId" gorm:"primary_key auto_increment"`
	MbtiName        string `json:"mbtiName" gorm:"not null"`
	MbtiDescription string `json:"mbtiDescription" gorm:"not null"`
}
