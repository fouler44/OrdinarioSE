const Agenda = require('../models/agenda');
const { 
  validarHorarios, 
  validarHorariosDisponibles 
} = require('../utils/funciones');

const crearAgenda = async (req, res) => {
  try {
    const { horarioInicio, horarioTermino, horariosDisponibles, tiempoSeparacion } = req.body;

    validarHorarios(horarioInicio, horarioTermino);

    validarHorariosDisponibles(horariosDisponibles, horarioInicio, horarioTermino, tiempoSeparacion);

    const nuevaAgenda = new Agenda(req.body);
    const agendaGuardada = await nuevaAgenda.save();
    res.status(201).json(agendaGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerAgendas = async (req, res) => {
  try {
    const agendas = await Agenda.find();
    res.json(agendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerAgendaPorId = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);
    if (!agenda) return res.status(404).json({ mensaje: 'Agenda no encontrada' });
    res.json(agenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarAgenda = async (req, res) => {
  try {
    const { horarioInicio, horarioTermino, horariosDisponibles, tiempoSeparacion } = req.body;

    validarHorarios(horarioInicio, horarioTermino);

    validarHorariosDisponibles(horariosDisponibles, horarioInicio, horarioTermino, tiempoSeparacion);

    const agenda = await Agenda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!agenda) return res.status(404).json({ mensaje: 'Agenda no encontrada' });
    res.json(agenda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.findByIdAndDelete(req.params.id);
    if (!agenda) return res.status(404).json({ mensaje: 'Agenda no encontrada' });
    res.json({ mensaje: 'Agenda eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearAgenda,
  obtenerAgendas,
  obtenerAgendaPorId,
  actualizarAgenda,
  eliminarAgenda,
};
