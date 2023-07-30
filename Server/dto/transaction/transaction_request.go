package transactiondto

import "waysbooks/models"

type TransactionRequest struct {
	CartID         int          `json:"cart_id" form:"cart_id"`
	UserID         int          `json:"user_id" form:"user_id"`
	BookID         int          `json:"book_id" form:"book_id" validate:"required"`
	BooksPurchased models.Books `json:"bookPurchased"`
	Attachment     string       `json:"attachment"`
	TotalPayment   string       `json:"totalPayment"`
}
