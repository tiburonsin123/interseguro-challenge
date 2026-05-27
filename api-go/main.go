// @title           Interseguro QR API
// @version         1.0
// @description     API para factorización QR de matrices rectangulares. Calcula Q y R con Gonum y retorna estadísticas desde la API Node.js.
// @host            localhost:8080
// @BasePath        /
// @schemes         http
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
package main

import (
	"os"

	_ "interseguro/api-go/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	fiberSwagger "github.com/gofiber/swagger"
	"interseguro/api-go/routes"
)

func main() {
	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
		},
	})

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{AllowOrigins: "*", AllowHeaders: "*", AllowMethods: "*"}))

	app.Get("/swagger/*", fiberSwagger.HandlerDefault)

	routes.Setup(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	app.Listen(":" + port)
}
