package services

import (
	"fmt"
	"os"
	"time"

	"github.com/go-resty/resty/v2"
	"gonum.org/v1/gonum/mat"
)

type QRPayload struct {
	Q [][]float64 `json:"Q"`
	R [][]float64 `json:"R"`
}

// Response es el resultado completo retornado al cliente
type Response struct {
	OriginalMatrix [][]float64            `json:"original_matrix"`
	Q              [][]float64            `json:"Q"`
	R              [][]float64            `json:"R"`
	Statistics     map[string]interface{} `json:"statistics"`
}

// ProcessQR realiza la factorización QR usando Gonum y luego obtiene
// estadísticas de la API Node.js.
func ProcessQR(input [][]float64, token string) (*Response, error) {
	m := len(input)
	n := len(input[0])

	for i, row := range input {
		if len(row) != n {
			return nil, fmt.Errorf("fila %d tiene longitud diferente", i)
		}
	}

	if m < n {
		return nil, fmt.Errorf("la matriz requiere m >= n (%d filas, %d columnas)", m, n)
	}

	// Construir la matriz densa de Gonum
	data := make([]float64, m*n)
	for i, row := range input {
		for j, v := range row {
			data[i*n+j] = v
		}
	}
	A := mat.NewDense(m, n, data)

	// Factorización QR con Gonum (Householder reflections)
	var qr mat.QR
	qr.Factorize(A)

	var Q, R mat.Dense
	qr.QTo(&Q)
	qr.RTo(&R)

	qSlice := denseToSlice(&Q)
	rSlice := denseToSlice(&R)

	stats, err := fetchStatistics(qSlice, rSlice, token)
	if err != nil {
		return nil, fmt.Errorf("error en servicio de estadísticas: %w", err)
	}

	return &Response{
		OriginalMatrix: input,
		Q:              qSlice,
		R:              rSlice,
		Statistics:     stats,
	}, nil
}

func denseToSlice(m *mat.Dense) [][]float64 {
	rows, cols := m.Dims()
	result := make([][]float64, rows)
	for i := range result {
		result[i] = make([]float64, cols)
		for j := 0; j < cols; j++ {
			result[i][j] = m.At(i, j)
		}
	}
	return result
}

// fetchStatistics envía Q y R a la API Node.js con resty, reenviando el JWT del cliente.
func fetchStatistics(Q, R [][]float64, token string) (map[string]interface{}, error) {
	nodeURL := os.Getenv("NODE_API_URL")
	if nodeURL == "" {
		nodeURL = "http://api-node:4000"
	}

	var stats map[string]interface{}

	_, err := resty.New().
		SetTimeout(10 * time.Second).
		SetRetryCount(4).
		SetRetryWaitTime(1 * time.Second).
		R().
		SetHeader("Authorization", "Bearer "+token).
		SetBody(QRPayload{Q: Q, R: R}).
		SetResult(&stats).
		Post(nodeURL + "/statistics")

	if err != nil {
		return nil, err
	}

	return stats, nil
}
