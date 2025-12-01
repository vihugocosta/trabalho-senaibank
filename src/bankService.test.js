const bankService = require('./bankService');

describe('BankService Unit Tests', () => {
    
    // Reseta o "banco de dados" antes de cada teste para garantir isolamento
    beforeEach(() => {
        bankService.resetDb();
    });

    test('Deve transferir valor corretamente entre contas (Caminho Feliz)', () => {
        // Alice(1000) -> Bob(500) : Valor 500
        const result = bankService.transfer(1, 2, 500);

        expect(result.success).toBe(true);
        expect(result.newSenderBalance).toBe(500);
        
        expect(bankService.getBalance(1)).toBe(500); // Alice
        expect(bankService.getBalance(2)).toBe(1000); // Bob
    });

    test('NÃO deve transferir se saldo for insuficiente (Cenário Negativo)', () => {
        // Bob(500) tenta transferir 600
        expect(() => {
            bankService.transfer(2, 1, 600);
        }).toThrow("Saldo insuficiente");

        // Valida que saldos não mudaram
        expect(bankService.getBalance(2)).toBe(500);
    });

    test('NÃO deve transferir valor negativo ou zero (Limite)', () => {
        expect(() => {
            bankService.transfer(1, 2, -100);
        }).toThrow("Valor inválido");

        expect(() => {
            bankService.transfer(1, 2, 0);
        }).toThrow("Valor inválido");
    });

    test('Deve lançar erro se usuário não existir (Input)', () => {
        expect(() => {
            bankService.transfer(99, 2, 100);
        }).toThrow("Usuário não encontrado");
    });
});