package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func CategoryRoutes(router *gin.Engine, CategoryController *controllers.CategoryController) {
	categoryRoutes := router.Group("/categories")
	{
		categoryRoutes.GET("/categories", CategoryController.GetAllCategories)
		categoryRoutes.GET("/category/:id", CategoryController.GetCategoryByID)
		categoryRoutes.POST("/add", CategoryController.AddCategory)
		categoryRoutes.PUT("/edit/:id", CategoryController.UpdateCategory)
		categoryRoutes.DELETE("/delete/:id", CategoryController.DeleteCategory)
	}
}