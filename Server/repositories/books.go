package repositories

import (
	"waysbooks/models"

	"gorm.io/gorm"
)

type repository struct {
	db *gorm.DB
}

type BooksRepository interface {
	FindBooks() ([]models.Books, error)
	CreateBooks(books models.Books) (models.Books, error)
	GetBooksById(Id int) (models.Books, error)
}

func RepositoryBooks(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindBooks() ([]models.Books, error) {
	var books []models.Books
	err := r.db.Find(&books).Error

	return books, err
}

func (r *repository) CreateBooks(books models.Books) (models.Books, error) {
	err := r.db.Create(&books).Error

	return books, err
}

func (r *repository) GetBooksById(Id int) (models.Books, error) {
	var books models.Books

	err := r.db.First(&books, Id).Error

	return books, err
}
