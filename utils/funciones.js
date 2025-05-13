function convertirHoraAMinutos(horaStr) {
  const [horas, minutos] = horaStr.split(':').map(Number);
  return horas * 60 + minutos;
}

function convertirMinutosAHora(minutos) {
  const h = Math.floor(minutos / 60).toString().padStart(2, '0');
  const m = (minutos % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

const validarHorarios = (horarioInicio, horarioTermino) => {
  if (horarioInicio >= horarioTermino) {
    throw new Error('El horario de inicio debe ser menor que el de término.');
  }
};

const calcularDuracionTotal = (horarioInicio, horarioTermino) => {
  return horarioTermino - horarioInicio;
};

const calcularBloquesDisponibles = (duracionTotal, tiempoSeparacion) => {
  return Math.floor(duracionTotal / tiempoSeparacion);
};

const validarHorariosDisponibles = (horariosDisponibles, horarioInicio, horarioTermino, tiempoSeparacion) => {
  const duracionTotal = calcularDuracionTotal(horarioInicio, horarioTermino);
  const bloquesDisponibles = calcularBloquesDisponibles(duracionTotal, tiempoSeparacion);

  if (horariosDisponibles > bloquesDisponibles) {
    throw new Error('La cantidad de horarios disponibles no cabe dentro del rango de tiempo especificado.');
  }
};

function obtenerRangoDeBloque(fecha, agenda) {
  const minutos = fecha.getHours() * 60 + fecha.getMinutes();
  const bloque = Math.floor((minutos - agenda.horarioInicio) / agenda.tiempoRotacion);
  const bloqueInicio = agenda.horarioInicio + bloque * agenda.tiempoRotacion;
  const bloqueFin = bloqueInicio + agenda.tiempoRotacion;

  const inicio = new Date(fecha);
  inicio.setHours(0, 0, 0, 0);
  inicio.setMinutes(bloqueInicio);

  const fin = new Date(fecha);
  fin.setHours(0, 0, 0, 0);
  fin.setMinutes(bloqueFin);

  return [inicio, fin];
}

async function validarEventoDisponible({ fecha, agenda, agendaId }) {
  const minutos = fecha.getHours() * 60 + fecha.getMinutes();

  if (minutos < agenda.horarioInicio || minutos > agenda.horarioTermino) {
    return 'El evento está fuera del horario permitido por la agenda';
  }

  const [inicioBloque, finBloque] = obtenerRangoDeBloque(fecha, agenda);

  const eventos = await Evento.find({
    agendaId,
    fecha: { $gte: inicioBloque, $lt: finBloque }
  });

  if (eventos.length >= agenda.horariosDisponibles) {
    return 'No hay espacios disponibles en ese bloque';
  }

  for (const ev of eventos) {
    const evMin = ev.fecha.getHours() * 60 + ev.fecha.getMinutes();
    if (Math.abs(evMin - minutos) < agenda.tiempoSeparacion) {
      return 'El evento está demasiado cercano a otro ya existente';
    }
  }

  return null;
}

module.exports = {
  convertirHoraAMinutos,
  convertirMinutosAHora,
  validarHorarios,
  validarHorariosDisponibles,
  obtenerRangoDeBloque,
  validarEventoDisponible
};
