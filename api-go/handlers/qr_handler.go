package handlers

import (
	"github.com/gofiber/fiber/v2"
	"interseguro/api-go/services"
)

// MatrixRequest representa el cuerpo de la solicitud
type MatrixRequest struct {
	Matrix [][]float64 `json:"matrix" example:"[[1,2],[3,4],[5,6]]"`
}

// QRHandler godoc
// @Summary      Factorización QR de una matriz
// @Description  Recibe una matriz rectangular (m×n, m≥n), calcula su factorización QR con Gonum y retorna Q, R y estadísticas calculadas por la API Node.js.
// @Tags         QR
// @Security     BearerAuth
// @Accept       json
// @Produce      json
// @Param        request  body      MatrixRequest   true  "Matriz de entrada (m filas, n columnas, m >= n)"
// @Success      200      {object}  services.Response
// @Failure      400      {object}  map[string]string
// @Failure      401      {object}  map[string]string
// @Failure      422      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Router       /qr [post]
func QRHandler(c *fiber.Ctx) error {
	var req MatrixRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "cuerpo de solicitud inválido"})
	}

	if len(req.Matrix) == 0 || len(req.Matrix[0]) == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "la matriz no puede estar vacía"})
	}

	// Extrae el token guardado por el middleware para reenviarlo a Node.js
	token := c.Locals("token").(string)

	result, err := services.ProcessQR(req.Matrix, token)
	if err != nil {
		return c.Status(422).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(result)
}
