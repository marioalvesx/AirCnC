const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
});

module.exports = mongoose.model('User', UserSchema);

// Agora o Mongoose sabe que se eu tentar criar um usuário, o usuário vai ter só um campo de email;