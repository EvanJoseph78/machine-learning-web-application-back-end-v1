const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "API do projeto Machine Learning",
      description:
        "Essa API tem como objetivo a manipulação de cursos no projeto Machine Learning",
      contact: {
        email: "evandromariano49@gmail.com",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001/api/",
        description: "API de teste",
      },
      {
        url: "https://machine-learning-web-application-back-end.vercel.app/api/",
        description: "API de produção",
      },
    ],
    paths: {
      "/cursos": {
        post: {
          summary: "Cadastro de cursos",
          description: "Rota responsável pelo cadastro de novos cursos",
          tags: ["Cursos"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Curso",
                },
                examples: {
                  curso: {
                    value: {
                      nome: "Exemplo de Curso",
                      introducao: "Uma introdução do curso",
                      descricao: "Uma descrição do curso",
                      duracao: 4,
                      disciplina: "Machine Learning",
                      nivel: "Básico",
                      certificado: true,
                      professores: [
                        {
                          nome: "Professor 1",
                          formacao1: "formacao 1",
                          formacao2: "formacao 2",
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/Curso",
                  },
                },
              },
            },
          },
        },
        get: {
          summary: "Listagem de cursos",
          description: "Rota responsável pela listagem de cursos",
          tags: ["Cursos"],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/Curso",
                  },
                },
              },
            },
          },
        },
      },
      "/cursos/{id}/add/modulos": {
        post: {
          summary: "Adiciona um módulo em um curso",
          description: "Rota responsável pela adição de um módulo",
          tags: ["Cursos"],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Modulo",
                },
                examples: {
                  curso: {
                    value: {
                      numeromodulo: 1,
                      titulo: "Módulo 1",
                      linkcapa: "hppt://link.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/Modulo",
                  },
                },
              },
            },
          },

          parameters: [
            {
              name: "id",
              in: "path",
              description: "Adiciona um módulo a um curso pelo id do curso",
              required: true,
            },
          ],
        },
      },
      "/cursos/{idcurso}/modulos/{idmodulo}/add/aula": {
        post: {
          summary: "Adiciona uma aula a um módulo em um curso.",
          tags: ["Aulas"],
          parameters: [
            {
              in: "path",
              name: "idcurso",
              required: true,
              description: "ID do curso.",
            },
            {
              in: "path",
              name: "idmodulo",
              required: true,
              description: "ID do módulo.",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    numeroaula: {
                      type: "integer",
                    },
                    titulo: {
                      type: "string",
                    },
                    linkaula: {
                      type: "string",
                    },
                    linkcapa: {
                      type: "string",
                    },
                    materiaisextras: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Aula adicionada com sucesso.",
              content: {
                "application/json": {
                  example: {
                    message: "Aula adicionada com sucesso!",
                  },
                  schema: {
                    type: "object",
                    $ref: "#/components/schemas/Aula",
                  },
                },
              },
            },
          },
        },
      },
      "/cursos/{idcurso}/modulos/{idmodulo}/add/question": {
        post: {
          summary: "Adiciona uma nova questão a um módulo de um curso.",
          tags: ["Questões"],
          parameters: [
            {
              in: "path",
              name: "idcurso",
              required: true,
              description: "ID do curso.",
              schema: {
                type: "string"
              }
            },
            {
              in: "path",
              name: "idmodulo",
              required: true,
              description: "ID do módulo.",
              schema: {
                type: "string"
              }
            }
          ],
          requestBody: {
            description: "Dados da nova questão.",
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    enunciado: {
                      type: "string",
                      description: "Enunciado da questão."
                    },
                    opcoes: {
                      type: "array",
                      items: {
                        properties: {
                          texto: {
                            type: "string",
                            description: "Texto da opção."
                          },
                          correta: {
                            type: "boolean",
                            description: "Indica se a opção é correta ou não."
                          }
                        }

                      }
                    }
                  },
                  required: ["enunciado", "texto", "correta"]
                }
              }
            }
          },
          responses: {
            201: {
              description: "Questão adicionada com sucesso."
            },
            400: {
              description: "Requisição inválida (por exemplo, propriedade 'correta' não é um booleano)."
            },
            404: {
              description: "Curso ou módulo não encontrado."
            },
            500: {
              description: "Erro interno do servidor."
            }
          }
        }
      }
    },
    components: {
      securitySchemes: {
        JWT: {
          name: "User Authorization",
          description: "Value: Bearer {token}",
          type: "apiKey",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Curso: {
          type: "object",
          properties: {
            nome: {
              type: "string",
            },
            introducao: {
              type: "string",
            },
            descricao: {
              type: "string",
            },
            duracao: {
              type: "number",
            },
            disciplina: {
              type: "string",
            },
            nivel: {
              type: "string",
            },
            certificado: {
              type: "boolean",
            },
            professores: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  nome: {
                    type: "string",
                  },
                  formacao1: {
                    type: "string",
                  },
                  formacao2: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        Modulo: {
          type: "object",
          properties: {
            numeromodulo: {
              type: "number",
            },
            titulo: {
              type: "string",
            },
            linkcapa: {
              type: "string",
            },
          },
        },
        Aula: {
          type: "object",
          properties: {
            numeroaula: {
              type: "number",
            },
            titulo: {
              type: "string",
            },
            linkaula: {
              type: "string",
            },
            linkcapa: {
              type: "string",
            },
            materiaisextras: {
              type: "string",
            },
          },
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

module.exports = swaggerUi.setup(swaggerDocs, options);
