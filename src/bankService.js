// Simulação de Banco de Dados em Memória
let users = [
    { id: 1, name: 'Alice', balance: 1000 },
    { id: 2, name: 'Bob', balance: 500 }
];

const bankService = {
    // Função auxiliar apenas para facilitar os testes automatizados
    resetDb: () => {
        users = [
            { id: 1, name: 'Alice', balance: 1000 },
            { id: 2, name: 'Bob', balance: 500 }
        ];
    },

    getBalance: (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? user.balance : null;
    },

    transfer: (senderId, receiverId, amount) => {
        const sender = users.find(u => u.id === senderId);
        const receiver = users.find(u => u.id === receiverId);

        // Validação de Existência (Cenário de Input)
        if (!sender || !receiver) {
            throw new Error("Usuário não encontrado");
        }

        // Validação de Limite (Boundary)
        if (amount <= 0) {
            throw new Error("Valor inválido");
        }

        // Validação de Saldo (Cenário Negativo)
        if (sender.balance < amount) {
            throw new Error("Saldo insuficiente");
        }

        sender.balance -= amount;
        receiver.balance += amount;

        return {
            success: true,
            newSenderBalance: sender.balance,
            message: "Transferência realizada"
        };
    }
};

module.exports = bankService;