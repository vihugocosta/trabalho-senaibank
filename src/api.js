const express = require('express');
const bankService = require('./bankService');
const app = express();

app.use(express.json());

app.post('/transfer', (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        
        // Validação básica de campos
        if(!senderId || !receiverId || !amount) {
            return res.status(400).json({ error: "Dados incompletos" });
        }

        const result = bankService.transfer(senderId, receiverId, amount);
        res.status(200).json(result);

    } catch (error) {
        // Tratamento de erros específicos conforme os cenários
        if (error.message === "Usuário não encontrado") {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === "Saldo insuficiente") {
            return res.status(422).json({ error: error.message });
        }
        if (error.message === "Valor inválido") {
            return res.status(400).json({ error: error.message });
        }
        
        // Erro genérico
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;