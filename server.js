const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require("./config/db")
const port = process.env.PORT || 5000
const { errorHandler } = require("./middleware/errorMiddleware")

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/agendas', agendaRoutes);
app.use('/api/eventos', eventoRoutes);

app.use(errorHandler)

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))