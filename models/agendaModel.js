const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
nombre: { type: String, required: true },
descripcion: String,

horariosDisponibles: {
type: Number,
required: true,
min: [1, 'Debe haber al menos 1 horario disponible']
},

horarioInicio: {
type: Number, //Tiene que ser en minutos desde medianoche
required: true,
min: [0, 'El horario de inicio debe ser al menos 00:00'],
max: [1439, 'El horario de inicio no puede ser mayor que 23:59']
},

horarioTermino: {
type: Number,
required: true,
min: [1, 'El horario de término debe ser mayor que 00:00'],
max: [1439, 'El horario de término no puede ser mayor que 23:59']
},

tiempoSeparacion: {
type: Number, // Tiene que ser en minutos
required: true,
min: [1, 'El tiempo de separación debe ser mayor a 0']
},

tiempoRotacion: {
type: Number, // Tiene que ser en minutos
required: true,
min: [1, 'El tiempo de rotación debe ser mayor a 0']
}
});

module.exports = mongoose.model('Agenda', agendaSchema);