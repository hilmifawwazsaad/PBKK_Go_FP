package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine, UserController *controllers.UserController) {
	userRoutes := router.Group("/users")
    {
        userRoutes.POST("/register", UserController.Register)
        userRoutes.POST("/login", UserController.Login)
        userRoutes.GET("/users", UserController.GetAllUsers)
        userRoutes.POST("/add", UserController.CreateUser)
        userRoutes.DELETE("/delete/:id", UserController.DeleteUser)
        userRoutes.PUT("/edit/:id", UserController.UpdateUser)
        userRoutes.GET("/user/:id", UserController.GetUserByID)
    }
}
