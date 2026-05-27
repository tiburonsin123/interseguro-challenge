const statisticsService = require('../services/statistics_service');

exports.compute = (req, res) => {
    const { Q, R } = req.body;

    if (!Q || !R || !Array.isArray(Q) || !Array.isArray(R)) {
        return res.status(400).json({ error: 'Se requieren las matrices Q y R como arrays' });
    }

    try {
        const result = statisticsService.compute(Q, R);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
