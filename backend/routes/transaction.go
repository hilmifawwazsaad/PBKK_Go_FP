package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func TransactionRoutes(router *gin.Engine, TransactionController *controllers.TransactionController) {
	transactionRoutes := router.Group("/transactions")
	{
		transactionRoutes.GET("/transactions", TransactionController.GetAllTransactions)
		transactionRoutes.GET("/transactions/:id", TransactionController.GetTransactionByID)
		transactionRoutes.POST("/transactions", TransactionController.AddTransaction)
		transactionRoutes.PUT("/transactions/:id", TransactionController.UpdateTransaction)
		transactionRoutes.DELETE("/transactions/:id", TransactionController.DeleteTransaction)
	}
}