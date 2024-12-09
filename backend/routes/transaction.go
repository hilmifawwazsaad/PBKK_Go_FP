package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func TransactionRoutes(router *gin.Engine, TransactionController *controllers.TransactionController) {
	transactionRoutes := router.Group("/transactions")
	{
		transactionRoutes.GET("/transactions", TransactionController.GetAllTransactions)
		transactionRoutes.GET("/transaction/:id", TransactionController.GetTransactionByID)
		transactionRoutes.POST("/add", TransactionController.AddTransaction)
		transactionRoutes.PUT("/edit/:id", TransactionController.UpdateTransaction)
		transactionRoutes.DELETE("/delete/:id", TransactionController.DeleteTransaction)
	}
}