package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	dto "waysbooks/dto/result"

	transactiondto "waysbooks/dto/transaction"
	"waysbooks/models"
	"waysbooks/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

type dataTransaction struct {
	Transaction interface{} `json:"transaction"`
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {

	BookID, _ := strconv.Atoi(c.FormValue("book_id"))
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	request := new(transactiondto.TransactionRequest)

	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})

	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	T := request.BooksPurchased.Price

	fmt.Println(T)

	transaction := models.Transaction{
		UserID:       int(userId),
		Attachment:   request.Attachment,
		BookID:       BookID,
		TotalPayment: T,
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	newTransaction, err := h.TransactionRepository.GetTransaction(data.ID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataTransaction{Transaction: convertDetailTransactionResponse(newTransaction)}})
}

func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: dataTransaction{
			Transaction: transaction,
		},
	})
}

func (h *handlerTransaction) GetTransactionByUserId(c echo.Context) error {
	// id, _ := strconv.Atoi(c.Param("id"))
	userLogin := c.Get("userLogin")
	userId := int(userLogin.(jwt.MapClaims)["id"].(float64))
	// UserID, _ := strconv.Atoi(c.FormValue("user_id"))
	transaction, err := h.TransactionRepository.GetTransactionByUserId(userId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: dataTransaction{
			Transaction: transaction,
		},
	})
}

func convertDetailTransactionResponse(d models.Transaction) transactiondto.TransactionResponse {

	return transactiondto.TransactionResponse{
		ID:             d.ID,
		UserID:         d.UserID,
		User:           models.UserCartResponse(d.User),
		Attachment:     d.Attachment,
		BookID:         d.BookID,
		BooksPurchased: models.Books(d.BooksPurchased),
		TotalPayment:   d.BooksPurchased.Price,
		Status:         d.Status,
	}
}

func (h *handlerTransaction) FindTransaction(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransaction()

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataTransaction{Transaction: transaction}})
}

func (h *handlerTransaction) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}