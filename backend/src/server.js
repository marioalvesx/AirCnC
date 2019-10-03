const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack9:omnistack@cluster0-phftt.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição e deletes)
// req.body = Acessar corpo da requisição (criação e edição)


app.use(cors()); /* Qualquer aplicação (externa, inclusive) pode usar a API. Para consertar isso: { origin: 'http://localhost:3333' } -> Para aprendizado, pode ficar assim por enquanto. */
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);