const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoControllers');

router.post('/', eventoController.crearEvento);

router.get('/', eventoController.obtenerEventos);

router.get('/agenda/:agendaId', eventoController.obtenerEventosPorAgenda);

router.put('/:id', eventoController.actualizarEvento);

router.delete('/:id', eventoController.eliminarEvento);

module.exports = router;