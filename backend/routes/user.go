package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine, uc *controllers.UserController) {
	router.POST("/register", uc.Register)
	router.POST("/login", uc.Login)
    router.GET("/users", uc.GetAllUsers)
    router.DELETE("/", uc.DeleteUser)
    router.PUT("/", uc.UpdateUser)
}
