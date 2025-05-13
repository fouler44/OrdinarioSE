const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  agendaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agenda', required: true },
  titulo: { type: String, required: true },
  fecha: { type: Date, required: true },
  descripcion: String
});

module.exports = mongoose.model('Evento', eventoSchema);
