const request = require('supertest');
const app = require('./api');
const bankService = require('./bankService');

describe('API Integration Tests', () => {

    beforeEach(() => {
        bankService.resetDb();
    });

    test('POST /transfer - Deve retornar 200 OK no sucesso', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2, amount: 100 });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.newSenderBalance).toBe(900);
    });

    test('POST /transfer - Deve retornar 400 se faltar campo amount', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 1, receiverId: 2 }); // Sem amount

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Dados incompletos");
    });

    test('POST /transfer - Deve retornar 404 se usuário não existir', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 999, receiverId: 2, amount: 100 });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Usuário não encontrado");
    });

    test('POST /transfer - Deve retornar 422 para saldo insuficiente', async () => {
        const response = await request(app)
            .post('/transfer')
            .send({ senderId: 2, receiverId: 1, amount: 10000 });

        expect(response.status).toBe(422);
        expect(response.body.error).toBe("Saldo insuficiente");
    });
});