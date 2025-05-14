const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { setupSwagger } = require('./swaggerConfig');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

setupSwagger(app);

app.use('/api/agendas', require('./routes/agendaRoutes'));
app.use('/api/eventos', require('./routes/eventoRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));