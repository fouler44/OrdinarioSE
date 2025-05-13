const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.post('/agenda', agendaController.crearAgenda);

router.get('/agendas', agendaController.obtenerAgendas);

router.get('/agenda/:id', agendaController.obtenerAgendaPorId);

router.put('/agenda/:id', agendaController.actualizarAgenda);

router.delete('/agenda/:id', agendaController.eliminarAgenda);

module.exports = router;
