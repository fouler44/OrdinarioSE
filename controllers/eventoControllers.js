const Evento = require('../models/eventoModel');
const Agenda = require('../models/agendaModel');
const { obtenerRangoDeBloque, validarEventoDisponible } = require('../utils/funciones');

const crearEvento = async (req, res) => {
  try {
    const { fecha, agendaId, ...resto } = req.body;

    const agenda = await Agenda.findById(agendaId);
    if (!agenda) throw new Error('Agenda no encontrada');

    // Convertir fecha como local
    const [fechaStr, horaStr] = fecha.split('T');
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    const [hora, minuto, segundo = 0] = horaStr.split(':').map(Number);
    const fechaLocal = new Date(anio, mes - 1, dia, hora, minuto, segundo);

    const error = await validarEventoDisponible({ fecha: fechaLocal, agenda, agendaId });
    if (error) throw new Error(error);

    const nuevoEvento = new Evento({ fecha: fechaLocal, agendaId, ...resto });
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
    const { fecha, agendaId, ...resto } = req.body;

    const agenda = await Agenda.findById(agendaId);
    if (!agenda) throw new Error('Agenda no encontrada');

    // Convertir fecha como local
    const [fechaStr, horaStr] = fecha.split('T');
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    const [hora, minuto, segundo = 0] = horaStr.split(':').map(Number);
    const fechaLocal = new Date(anio, mes - 1, dia, hora, minuto, segundo);

    const error = await validarEventoDisponible({
      fecha: fechaLocal,
      agenda,
      agendaId,
      idActual: req.params.id
    });
    if (error) throw new Error(error);

    const evento = await Evento.findByIdAndUpdate(
      req.params.id,
      { fecha: fechaLocal, agendaId, ...resto },
      { new: true }
    );

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
  eliminarEvento
};
