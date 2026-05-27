package routes

import (
	"github.com/gofiber/fiber/v2"
	"interseguro/api-go/handlers"
	"interseguro/api-go/middleware"
)

func Setup(app *fiber.App) {
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok", "service": "api-go"})
	})

	app.Post("/auth/login", handlers.LoginHandler)
	app.Post("/qr", middleware.JWTProtected(), handlers.QRHandler)
}
