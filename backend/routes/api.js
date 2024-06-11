// backend/routes/api.js
import express from 'express';
import Card from '../models/Card.js';

const router = express.Router();

// Endpoint do dodawania karty
router.post('/cards', async (req, res) => {
    try {
        const card = await Card.create(req.body);
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ error: 'Error creating card' });
    }
});

// Endpoint do pobierania kart
router.get('/cards', async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cards' });
    }
});

// Endpoint do aktualizacji karty
router.put('/cards/:id', async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id);
        if (card) {
            await card.update(req.body);
            res.status(200).json(card);
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating card' });
    }
});

// Endpoint do usuwania karty
router.delete('/cards/:id', async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id);
        if (card) {
            await card.destroy();
            res.status(200).json({ message: 'Card deleted' });
        } else {
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting card' });
    }
});

export default router;
