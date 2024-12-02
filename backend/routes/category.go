package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func CategoryRoutes(router *gin.Engine, CategoryController *controllers.CategoryController) {
	categoryRoutes := router.Group("/categories")
	{
		categoryRoutes.GET("/categories", CategoryController.GetAllCategories)
		categoryRoutes.GET("/categories/:id", CategoryController.GetCategoryByID)
		categoryRoutes.POST("/categories", CategoryController.AddCategory)
		categoryRoutes.PUT("/categories/:id", CategoryController.UpdateCategory)
		categoryRoutes.DELETE("/categories/:id", CategoryController.DeleteCategory)
	}
}