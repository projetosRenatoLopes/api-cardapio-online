const express = require('express');
const app = express();
const morgan = require('morgan');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(morgan('dev'));

// PERMISSOES DE ENTRADA NA API
app.use((req, res, next) => {
    // PERMITIR CONEXOES NA API
    res.header('Access-Control-Allow-Origin', '*')
    // TIPOS DE SOLICITACOES CONEXOES NA API
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})



// rotas
const rotaCompany = require('./routes/company');
const rotaProducts = require('./routes/products');
app.use('/empresa', rotaCompany);
app.use('/produtos', rotaProducts);


app.use('/api', (req, res, next) => {
    res.status(200).send('Cardápio Online by Renato Lopes');
});
app.use('/', (req, res, next) => {
    res.status(200).send('Cardápio Online by Renato Lopes');
});

app.use((req, res, next) => {
    const erro = new Error('Enedreço não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
})

module.exports = app; 