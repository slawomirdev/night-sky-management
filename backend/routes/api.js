import express from 'express';
import Star from '../models/Star.js';
import Constellation from '../models/Constellation.js';

const router = express.Router();

// Endpoint GET dla domyślnych danych
router.get('/sky', (req, res) => {
    const defaultData = {
        date: new Date().toISOString().split('T')[0], // Dzisiaj
        cloudiness: 5,
        moonPhase: 'full',
        precipitation: 'none',
        fogDensity: 2
    };
    res.json(defaultData);
});

// Przykładowe endpointy
router.post('/sky', (req, res) => {
    const { date, cloudiness, moonPhase, precipitation, fogDensity } = req.body;
    // Walidacja danych wejściowych
    if (cloudiness < 0 || cloudiness > 10 || fogDensity < 0 || fogDensity > 10) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    if (cloudiness === 0 && precipitation !== 'none') {
        return res.status(400).json({ error: 'No precipitation allowed with clear sky' });
    }
    res.json({ date, cloudiness, moonPhase, precipitation, fogDensity });
});

router.post('/stars', async (req, res) => {
    const { name, description, imageUrl, constellations, isLit } = req.body;
    try {
        const star = await Star.create({ name, description, imageUrl, constellations, isLit });
        res.status(201).json(star);
    } catch (error) {
        res.status(500).json({ error: 'Error creating star' });
    }
});

router.post('/constellations', async (req, res) => {
    const { name, description, imageUrl, stars, isLit } = req.body;
    try {
        const constellation = await Constellation.create({ name, description, imageUrl, stars, isLit });
        res.status(201).json(constellation);
    } catch (error) {
        res.status(500).json({ error: 'Error creating constellation' });
    }
});

export default router;
