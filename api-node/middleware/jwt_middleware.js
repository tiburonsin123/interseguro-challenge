const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'interseguro_secret_key';

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'token requerido' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'formato inválido: Bearer <token>' });
    }

    try {
        jwt.verify(parts[1], JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: 'token inválido o expirado' });
    }
};
