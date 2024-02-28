const { Curso: CursoModel, Curso } = require("../models/Curso");

const cursoController = {
  // lógica de curso

  // criação de curso
  create: async (req, res) => {
    try {
      const curso = {
        nome: req.body.nome,
        introducao: req.body.introducao,
        descricao: req.body.descricao,
        duracao: req.body.duracao,
        disciplina: req.body.disciplina,
        nivel: req.body.nivel,
        certificado: req.body.certificado,
        topicos: req.body.topicos,
        professores: req.body.professores,
        linkcapa: req.body.linkcapa,
      };

      const reponse = await CursoModel.create(curso);

      res.status(201).json({ reponse, msg: "curso criado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // busca todos os cursos
  getAll: async (req, res) => {
    try {
      const cursos = await CursoModel.find();
      const quantidadeCursos = cursos.length;
      res.json({ cursos: cursos, qntcursos: quantidadeCursos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // lógica de módulos

  // adiciona um módulo a um curso existente
  addModule: async (req, res) => {
    try {
      const curso = await CursoModel.findById(req.params.idcurso);
      // verifica se o curso existe
      console.log(curso);
      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      // Extrai os dados do módulo do corpo da solicitação
      const novoModulo = {
        numeromodulo: req.body.numeromodulo,
        titulo: req.body.titulo,
        linkcapa: req.body.linkcapa,
      };

      // Verifica se já existe um módulo com o mesmo número
      const moduloExistente = curso.modulos.find(
        (modulo) => modulo.numeromodulo === novoModulo.numeromodulo,
      );

      if (moduloExistente) {
        return res
          .status(400)
          .json({ error: "Já existe um módulo com o mesmo número" });
      }

      // Garante que numeromodulo é um número inteiro
      if (
        !Number.isInteger(novoModulo.numeromodulo) ||
        novoModulo.numeromodulo <= 0
      ) {
        return res.status(400).json({
          error: "O número do módulo deve ser um número inteiro maior que 0",
        });
      }

      // Adiciona o módulo ao array de módulos do curso
      curso.modulos.push(novoModulo);

      // Salva o curso atualizado no banco de dados
      await curso.save();

      // Responde com o curso atualizado
      res.status(201).json(curso);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // adiciona as questões pertencentes ao módulo

  addQuestion: async (req, res) => {
    try {
      const curso = await CursoModel.findById(req.params.idcurso);

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      // const modulo = curso.modulos.id(req.params.idmodulo);
      //
      // if (!modulo) {
      //   return res.status(404).json({ error: "Módulo não encontrado" });
      // }

      const novaQuestao = {
        enunciado: req.body.enunciado,
        opcoes: req.body.opcoes,
      };

      const opcoesVerdadeiras = novaQuestao.opcoes.filter(
        (opcao) => opcao.correta === true,
      );

      if (opcoesVerdadeiras.length !== 1) {
        return res.status(400).json({
          error: "Deve haver exatamente uma opção marcada como verdadeira",
        });
      }

      curso.questoes.push(novaQuestao);

      await curso.save();

      res
        .status(201)
        .json({ curso, message: "Questão adicionada com sucesso!" });
    } catch (error) {
      console.error(error);

      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getQuestions: async (req, res) => {
    try {
      // Encontre o curso pelo ID
      const curso = await CursoModel.findById(req.params.idcurso);

      // Verifique se o curso existe
      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      // Retorne o questionário do curso
      res.status(200).json({ questionario: curso.questoes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  // lógica de aulas

  // adiciona uma aula a um módulo existente
  addAula: async (req, res) => {
    try {
      const curso = await CursoModel.findById(req.params.idcurso);

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      const modulo = curso.modulos.id(req.params.idmodulo);
      console.log(modulo);

      if (!modulo) {
        return res.status(404).json({ error: "Módulo não encontrado" });
      }

      const novaAula = {
        numeroaula: req.body.numeroaula,
        titulo: req.body.titulo,
        linkaula: req.body.linkaula,
        linkcapa: req.body.linkcapa,
        materiaisextras: req.body.materiaisextras,
      };

      // Verifica se numeroaula é um número inteiro
      if (!Number.isInteger(novaAula.numeroaula) || novaAula.numeroaula <= 0) {
        return res.status(400).json({
          error: "O número da aula deve ser um número inteiro maior que 0",
        });
      }

      // Verifica se já existe uma aula com o mesmo número
      const aulaExistente = modulo.aulas.find(
        (aula) => aula.numeroaula === novaAula.numeroaula,
      );

      if (aulaExistente) {
        return res
          .status(400)
          .json({ error: "Já existe uma aula com o mesmo número" });
      }

      // Adiciona a aula ao array de aulas do módulo
      modulo.aulas.push(novaAula);

      await curso.save();

      res.status(201).json({ curso, message: "Aula adicionada com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

module.exports = cursoController;
