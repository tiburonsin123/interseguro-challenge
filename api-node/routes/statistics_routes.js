const { Router } = require('express');
const statisticsController = require('../controllers/statistics_controller');
const jwtMiddleware = require('../middleware/jwt_middleware');

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     QRMatrices:
 *       type: object
 *       required: [Q, R]
 *       properties:
 *         Q:
 *           type: array
 *           description: Matriz ortogonal Q
 *           items:
 *             type: array
 *             items:
 *               type: number
 *           example: [[-0.169, 0.897], [-0.507, 0.276], [-0.845, -0.345]]
 *         R:
 *           type: array
 *           description: Matriz triangular superior R
 *           items:
 *             type: array
 *             items:
 *               type: number
 *           example: [[-5.916, -7.437], [0, 0.828], [0, 0]]
 *     StatisticsResponse:
 *       type: object
 *       properties:
 *         max:
 *           type: number
 *         min:
 *           type: number
 *         average:
 *           type: number
 *         sum:
 *           type: number
 *         diagonal:
 *           type: object
 *           properties:
 *             Q:
 *               type: boolean
 *             R:
 *               type: boolean
 */

/**
 * @swagger
 * /statistics:
 *   post:
 *     summary: Calcular estadísticas sobre matrices Q y R
 *     description: Recibe las matrices Q y R de la factorización QR y retorna valor máximo, mínimo, promedio, suma total y verificación diagonal.
 *     tags: [Statistics]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QRMatrices'
 *     responses:
 *       200:
 *         description: Estadísticas calculadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatisticsResponse'
 *       401:
 *         description: Token inválido o ausente
 *       400:
 *         description: Matrices inválidas o ausentes
 */
router.post('/statistics', jwtMiddleware, statisticsController.compute);

module.exports = router;
