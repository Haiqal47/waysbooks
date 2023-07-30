package models

type Users struct {
	Id          int    `json:"id"`
	FullName    string `json:"fullName" gorm:"type: varchar(255)"`
	NoHandphone string `json:"noHandphone" gorm:"type: varchar(255)"`
	Email       string `json:"email" gorm:"type: varchar(255)"`
	Password    string `json:"password" gorm:"type: varchar(255)"`
	Gender      string `json:"gender" gorm:"type: varchar(255)"`
	Address     string `json:"address" gorm:"type: varchar(255)"`
	Role        string `json:"role" gorm:"default:'user'"`
}

type UserCartResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"name"`
	Email    string `json:"email"`
	Gender   string `json:"gender"`
}

func (UserCartResponse) TableName() string {
	return "users"
}
