const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
//Dependencias para ouvir o websocket
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app); // Extraindo servidor http de dentro do Express
const io = socketio(server); // Server consegue tambem ouvir protocolo websocket

mongoose.connect('mongodb+srv://omnistack9:omnistack@cluster0-phftt.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => { // Ouvir informação de todo usuário que se loga na aplicação
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id; // Relaciona ID do usuário com o seu id de conexão(socket.id)
}); // o 'socket' representa a conexão do usuário (React Web ou React Native)

app.use((req, res, next) => {   // Middleware - Funcionalidade do Express
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

//GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição e deletes)
// req.body = Acessar corpo da requisição (criação e edição)

app.use(cors()); /* Qualquer aplicação (externa, inclusive) pode usar a API. Para consertar isso: { origin: 'http://localhost:3333' } -> Para aprendizado, pode ficar assim por enquanto. */
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);