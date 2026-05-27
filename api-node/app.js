const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const statisticsRoutes = require('./routes/statistics_routes');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interseguro Statistics API',
      version: '1.0.0',
      description: 'API para calcular estadísticas sobre las matrices Q y R resultantes de la factorización QR.',
    },
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis: ['./routes/*.js'],
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'api-node' }));
app.use('/', statisticsRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API Node.js corriendo en el puerto ${PORT}`));

module.exports = app;
