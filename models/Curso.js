const mongoose = require("mongoose");

const { Schema } = mongoose;

const cursoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    introducao: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    duracao: {
      type: Number,
      required: true,
    },
    disciplina: {
      type: String,
      required: true,
    },
    nivel: {
      type: String,
      required: true,
    },
    certificado: {
      type: Boolean,
      required: true,
    },
    topicos: {
      type: [String],
      required: true,
    },
    professores: [
      {
        imgperfil: {
          type: String,
        },
        nome: {
          type: String,
          required: true,
        },
        formacao1: {
          type: String,
          required: true,
        },
        formacao2: {
          type: String,
        },
      },
    ],
    linkcapa: {
      type: String,
    },
    modulos: [
      {
        numeromodulo: {
          type: Number,
          required: true,
        },
        titulo: {
          type: String,
          required: true,
        },
        linkcapa: {
          type: String,
        },
        aulas: [
          {
            numeroaula: {
              type: Number,
              required: true,
            },
            titulo: {
              type: String,
              required: true,
            },
            transcricao: {
              type: String,
            },
            linkaula: {
              type: String,
              required: true,
            },
            linkcapa: {
              type: String,
            },
            materiaisextras: {
              type: String,
            },
          },
        ],

      },
    ],
    questoes: [
      {
        enunciado: {
          type: String,
          required: true,
        },
        opcoes: [
          {
            texto: {
              type: String,
              required: true,
            },
            correta: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],

  },
  { timestamps: true },
);

const Curso = mongoose.model("Curso", cursoSchema);

module.exports = {
  Curso,
  cursoSchema,
};
