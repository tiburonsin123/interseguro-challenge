# Interseguro – Coding Challenge

Solución al reto técnico de la División TI de Interseguro. Implementa dos APIs que se comunican entre sí para realizar la **factorización QR** de matrices y calcular estadísticas sobre los resultados.

## Arquitectura

```
Cliente / Frontend (React)
        │
        ▼
API Go + Fiber  :8080          ← recibe matriz, calcula QR con Gonum, protegida con JWT
        │
        │ HTTP interno
        ▼
API Node.js + Express  :4000   ← recibe Q y R, calcula estadísticas, protegida con JWT
```

## Tecnologías

| Servicio   | Lenguaje   | Framework | Puerto |
|------------|------------|-----------|--------|
| api-go     | Go 1.22    | Fiber     | 8080   |
| api-node   | Node.js 20 | Express   | 4000   |
| frontend   | React 18   | Vite      | 80     |

**Librerías destacadas:**
- `gonum` — factorización QR (Householder reflections)
- `go-resty` — cliente HTTP en Go
- `golang-jwt` — generación y validación de JWT en Go
- `jsonwebtoken` — validación de JWT en Node.js

## Requisitos

- Docker y Docker Compose instalados

## Levantar el proyecto

```bash
docker compose up --build -d
```

Eso es todo. Docker instala las dependencias, compila y levanta los 3 servicios.

## URLs

| Servicio         | URL                                        |
|------------------|--------------------------------------------|
| Frontend         | http://localhost                           |
| Swagger API Go   | http://localhost:8080/swagger/index.html   |
| Swagger API Node | http://localhost:4000/swagger              |

## Uso

### 1. Obtener token JWT

```bash
POST http://localhost:8080/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "interseguro123"
}
```

Respuesta:
```json
{ "token": "<jwt_token>" }
```

### 2. Calcular factorización QR

```bash
POST http://localhost:8080/qr
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "matrix": [
    [1, 2],
    [3, 4],
    [5, 6]
  ]
}
```

Respuesta:
```json
{
  "original_matrix": [[1,2],[3,4],[5,6]],
  "Q": [[ ... ]],
  "R": [[ ... ]],
  "statistics": {
    "max": 0.897085,
    "min": -7.437357,
    "average": -0.881237,
    "sum": -13.218558,
    "diagonal": { "Q": false, "R": false }
  }
}
```

### Reglas de la matriz
- Debe ser rectangular con **m ≥ n** (más filas que columnas)
- Valores numéricos, sin columnas linealmente dependientes

## Estructura del proyecto

```
TALSORY/
├── docker-compose.yml
├── .gitignore
├── README.md
├── api-go/
│   ├── handlers/
│   │   ├── auth_handler.go     ← endpoint de login
│   │   └── qr_handler.go       ← endpoint de factorización QR
│   ├── middleware/
│   │   └── jwt_middleware.go   ← validación JWT
│   ├── services/
│   │   └── qr_service.go       ← lógica QR con Gonum + llamada a Node
│   ├── routes/
│   │   └── routes.go
│   ├── main.go
│   ├── go.mod
│   └── Dockerfile
├── api-node/
│   ├── controllers/
│   │   └── statistics_controller.js
│   ├── services/
│   │   └── statistics_service.js
│   ├── middleware/
│   │   └── jwt_middleware.js   ← validación JWT
│   ├── routes/
│   │   └── statistics_routes.js
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login/
    │   │   ├── Header/
    │   │   ├── MatrixInput/
    │   │   ├── MatrixDisplay/
    │   │   ├── StatisticsPanel/
    │   │   └── ErrorAlert/
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── Dockerfile
```

## Detener los servicios

```bash
docker compose down
```
