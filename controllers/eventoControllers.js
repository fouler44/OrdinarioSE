const Evento = require('../models/evento');

const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    const eventoGuardado = await nuevoEvento.save();
    res.status(201).json(eventoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().populate('agendaId', 'nombre');
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerEventosPorAgenda = async (req, res) => {
  try {
    const eventos = await Evento.find({ agendaId: req.params.agendaId });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndDelete(req.params.id);
    if (!evento) return res.status(404).json({ mensaje: 'Evento no encontrado' });
    res.json({ mensaje: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearEvento,
  obtenerEventos,
  obtenerEventosPorAgenda,
  actualizarEvento,
  eliminarEvento,
};
