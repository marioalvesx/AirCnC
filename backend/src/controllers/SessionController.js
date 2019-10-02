const User = require('../models/User');

// Métodos de um Controller: index, show, store, update, destroy

module.exports = {
    async store(req, res) {
        const { email } = req.body; // Desestruturação - Evita a linha: const email = req.email.body;

        let user = await User.findOne({ email }); // Procura usuário com o email recebido

        if (!user) { // Caso não ache nenhum na base de dados, cria o novo usuário (Sem repetir usuários já criados)
            user = await User.create({ email });
        }

        // Só precisa do email do usuário para criar a sessão
        // const user = await User.create({ email }) 

        return res.json(user);
    }
};


