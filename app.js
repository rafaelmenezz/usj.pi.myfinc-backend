const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();

const users = require('./routes/usuario')
const receita = require('./routes/receita')
const despesa = require('./routes/despesa')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

app.use('/usuarios', users)
app.use('/receitas', receita)
app.use('/despesas', despesa)

app.use((req, res, next) => {
    const erro = new Error('Não Encontrado')
    erro.status = 404
    next(erro)
})

app.use((erro, req, res, next) => {
    res.status(erro.status || 500)
    return res.send({
        erro: {
            mensagem: erro.message
        }
    })
})

module.exports = app;