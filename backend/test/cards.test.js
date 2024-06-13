import request from 'supertest';
import sinon from 'sinon';
import app from '../server.js';
import Card from '../models/Card.js';
import { expect } from '@jest/globals';

describe('Cards API', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create a new card', async () => {
        const card = {
            question: 'What is the capital of France?',
            answer: 'Paris'
        };

        const createStub = sandbox.stub(Card, 'create').resolves({ id: 1, ...card });

        const res = await request(app)
            .post('/api/cards')
            .send(card)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('question', 'What is the capital of France?');
        expect(res.body).toHaveProperty('answer', 'Paris');
        expect(createStub.calledOnce).toBe(true);
    });

    it('should handle error when creating a new card', async () => {
        const card = {
            question: 'What is the capital of France?',
            answer: 'Paris'
        };

        const createStub = sandbox.stub(Card, 'create').rejects(new Error('Error creating card'));

        const res = await request(app)
            .post('/api/cards')
            .send(card)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error creating card');
        expect(createStub.calledOnce).toBe(true);
    });

    it('should retrieve all cards', async () => {
        const cards = [
            { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
            { id: 2, question: 'What is the capital of Germany?', answer: 'Berlin' }
        ];

        const findAllStub = sandbox.stub(Card, 'findAll').resolves(cards);

        const res = await request(app)
            .get('/api/cards')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(cards);
        expect(findAllStub.calledOnce).toBe(true);
    });

    it('should handle error when retrieving all cards', async () => {
        const findAllStub = sandbox.stub(Card, 'findAll').rejects(new Error('Error fetching cards'));

        const res = await request(app)
            .get('/api/cards')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error fetching cards');
        expect(findAllStub.calledOnce).toBe(true);
    });

    it('should update a card', async () => {
        const card = { id: 1, question: 'What is the capital of France?', answer: 'Paris' };
        const updatedCard = { id: 1, question: 'What is the capital of Germany?', answer: 'Berlin' };

        const updateStub = sinon.stub().resolves(updatedCard);
        const findByPkStub = sandbox.stub(Card, 'findByPk').resolves({
            ...card,
            update: updateStub
        });

        const res = await request(app)
            .put('/api/cards/1')
            .send(updatedCard)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(updatedCard);
        expect(findByPkStub.calledOnce).toBe(true);
        expect(updateStub.calledOnce).toBe(true);
    });

    it('should return 404 when updating a non-existent card', async () => {
        const updatedCard = { id: 1, question: 'What is the capital of Germany?', answer: 'Berlin' };

        const findByPkStub = sandbox.stub(Card, 'findByPk').resolves(null);

        const res = await request(app)
            .put('/api/cards/1')
            .send(updatedCard)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Card not found');
        expect(findByPkStub.calledOnce).toBe(true);
    });

    it('should handle error when updating a card', async () => {
        const card = { id: 1, question: 'What is the capital of France?', answer: 'Paris' };
        const updatedCard = { id: 1, question: 'What is the capital of Germany?', answer: 'Berlin' };

        const findByPkStub = sandbox.stub(Card, 'findByPk').rejects(new Error('Error updating card'));

        const res = await request(app)
            .put('/api/cards/1')
            .send(updatedCard)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error updating card');
        expect(findByPkStub.calledOnce).toBe(true);
    });

    it('should delete a card', async () => {
        const card = { id: 1, question: 'What is the capital of France?', answer: 'Paris' };

        const destroyStub = sinon.stub().resolves();
        const findByPkStub = sandbox.stub(Card, 'findByPk').resolves({
            ...card,
            destroy: destroyStub
        });

        const res = await request(app)
            .delete('/api/cards/1')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Card deleted' });
        expect(findByPkStub.calledOnce).toBe(true);
        expect(destroyStub.calledOnce).toBe(true);
    });

    it('should return 404 when deleting a non-existent card', async () => {
        const findByPkStub = sandbox.stub(Card, 'findByPk').resolves(null);

        const res = await request(app)
            .delete('/api/cards/1')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Card not found');
        expect(findByPkStub.calledOnce).toBe(true);
    });

    it('should handle error when deleting a card', async () => {
        const findByPkStub = sandbox.stub(Card, 'findByPk').rejects(new Error('Error deleting card'));

        const res = await request(app)
            .delete('/api/cards/1')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error deleting card');
        expect(findByPkStub.calledOnce).toBe(true);
    });
});
