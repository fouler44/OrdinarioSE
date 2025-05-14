const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Opciones de configuración para Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Agendas y Eventos",
      version: "1.0.0",
      description:
        "API para administrar agendas y eventos con horarios disponibles",
      contact: {
        name: "Administrador",
      },
    },
    servers: [
      {
        url: "/api",
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      schemas: {
        Agenda: {
          type: "object",
          required: [
            "nombre",
            "horariosDisponibles",
            "horarioInicio",
            "horarioTermino",
            "tiempoSeparacion",
            "tiempoRotacion",
          ],
          properties: {
            _id: {
              type: "string",
              description: "ID autogenerado de la agenda",
            },
            nombre: {
              type: "string",
              description: "Nombre de la agenda",
            },
            descripcion: {
              type: "string",
              description: "Descripción de la agenda",
            },
            horariosDisponibles: {
              type: "integer",
              description: "Número de horarios disponibles simultáneamente",
              minimum: 1,
            },
            horarioInicio: {
              type: "integer",
              description:
                "Minutos desde medianoche para el inicio de la agenda (0-1439)",
              minimum: 0,
              maximum: 1439,
            },
            horarioTermino: {
              type: "integer",
              description:
                "Minutos desde medianoche para el término de la agenda (1-1439)",
              minimum: 1,
              maximum: 1439,
            },
            tiempoSeparacion: {
              type: "integer",
              description:
                "Tiempo mínimo de separación entre eventos en minutos",
              minimum: 1,
            },
            tiempoRotacion: {
              type: "integer",
              description: "Tiempo de rotación entre bloques en minutos",
              minimum: 1,
            },
          },
        },
        Evento: {
          type: "object",
          required: ["agendaId", "titulo", "fecha"],
          properties: {
            _id: {
              type: "string",
              description: "ID autogenerado del evento",
            },
            agendaId: {
              type: "string",
              description: "ID de la agenda asociada",
            },
            titulo: {
              type: "string",
              description: "Título del evento",
            },
            fecha: {
              type: "string",
              format: "date-time",
              description: "Fecha y hora del evento",
            },
            descripcion: {
              type: "string",
              description: "Descripción del evento",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            stack: {
              type: "string",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Agendas",
        description: "Operaciones relacionadas con agendas",
      },
      {
        name: "Eventos",
        description: "Operaciones relacionadas con eventos",
      },
    ],
    paths: {
      "/agendas": {
        post: {
          tags: ["Agendas"],
          summary: "Crear una nueva agenda",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Agenda",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Agenda creada exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Agenda",
                  },
                },
              },
            },
            400: {
              description: "Datos inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ["Agendas"],
          summary: "Obtener todas las agendas",
          responses: {
            200: {
              description: "Lista de agendas",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Agenda",
                    },
                  },
                },
              },
            },
            500: {
              description: "Error del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/agendas/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID de la agenda",
            schema: {
              type: "string",
            },
          },
        ],
        get: {
          tags: ["Agendas"],
          summary: "Obtener una agenda por su ID",
          responses: {
            200: {
              description: "Detalles de la agenda",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Agenda",
                  },
                },
              },
            },
            404: {
              description: "Agenda no encontrada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensaje: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Error del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Agendas"],
          summary: "Actualizar una agenda",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Agenda",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Agenda actualizada",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Agenda",
                  },
                },
              },
            },
            400: {
              description: "Datos inválidos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
            404: {
              description: "Agenda no encontrada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensaje: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Agendas"],
          summary: "Eliminar una agenda",
          responses: {
            200: {
              description: "Agenda eliminada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensaje: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Agenda no encontrada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensaje: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Error del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/eventos": {
        post: {
          tags: ["Eventos"],
          summary: "Crear un nuevo evento",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Evento",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Evento creado exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Evento",
                  },
                },
              },
            },
            400: {
              description: "Datos inválidos o evento no disponible",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ["Eventos"],
          summary: "Obtener todos los eventos",
          responses: {
            200: {
              description: "Lista de eventos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Evento",
                    },
                  },
                },
              },
            },
            500: {
              description: "Error del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/eventos/agenda/{agendaId}": {
        parameters: [
          {
            name: "agendaId",
            in: "path",
            required: true,
            description: "ID de la agenda",
            schema: {
              type: "string",
            },
          },
        ],
        get: {
          tags: ["Eventos"],
          summary: "Obtener eventos por agenda",
          responses: {
            200: {
              description: "Lista de eventos de la agenda",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Evento",
                    },
                  },
                },
              },
            },
            500: {
              description: "Error del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/eventos/{id}": {
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID del evento",
            schema: {
              type: "string",
            },
          },
        ],
        put: {
          tags: ["Eventos"],
          summary: "Actualizar un evento",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Evento",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Evento actualizado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Evento",
                  },
                },
              },
            },
            400: {
              description: "Datos inválidos o evento no disponible",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
            404: {
              description: "Evento no encontrado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensaje: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Eventos"],
          summary: "Eliminar un evento",
          responses: {
            200: {
              description: "Evento eliminado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensaje: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "Evento no encontrado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      mensaje: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Error del servidor",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Se puede omitir ya que definimos las rutas manualmente
};

// Generar especificación Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Función para configurar Swagger en la aplicación Express
const setupSwagger = (app) => {
  // Ruta para la documentación Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Ruta para obtener la especificación JSON de Swagger
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log("Documentación Swagger disponible en /api-docs");
};

module.exports = { setupSwagger };