const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaControllers');

router.post('/', agendaController.crearAgenda);

router.get('/', agendaController.obtenerAgendas);

router.get('/:id', agendaController.obtenerAgendaPorId);

router.put('/:id', agendaController.actualizarAgenda);

router.delete('/:id', agendaController.eliminarAgenda);

module.exports = router;
