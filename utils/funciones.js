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

module.exports = {
  convertirHoraAMinutos,
  convertirMinutosAHora,
  validarHorarios,
  validarHorariosDisponibles
};
