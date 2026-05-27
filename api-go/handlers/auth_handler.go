package handlers

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type LoginRequest struct {
	Username string `json:"username" example:"admin"`
	Password string `json:"password" example:"interseguro123"`
}

// LoginHandler godoc
// @Summary      Obtener token JWT
// @Description  Autentica al usuario y retorna un token JWT válido por 24 horas.
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param        request  body      LoginRequest  true  "Credenciales"
// @Success      200      {object}  map[string]string
// @Failure      400      {object}  map[string]string
// @Failure      401      {object}  map[string]string
// @Router       /auth/login [post]
func LoginHandler(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "cuerpo de solicitud inválido"})
	}

	if req.Username != "admin" || req.Password != "interseguro123" {
		return c.Status(401).JSON(fiber.Map{"error": "credenciales incorrectas"})
	}

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "interseguro_secret_key"
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": req.Username,
		"exp": time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenStr, err := token.SignedString([]byte(secret))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "error generando token"})
	}

	return c.JSON(fiber.Map{"token": tokenStr})
}
