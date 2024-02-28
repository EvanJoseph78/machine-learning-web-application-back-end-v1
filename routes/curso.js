const router = require("express").Router();

const cursoController = require("../controllers/cursoController");
const cursocontroller = require("../models/Curso");

// rotas de curso

// rota para adicionar um novo curso
router.route("/cursos").post((req, res) => {
  console.log(req.body);
  cursoController.create(req, res);
});

// rota para obter todos os cursos
router.route("/cursos").get((req, res) => cursoController.getAll(req, res));

// rotas de curso

// cria um módulo de um curso
router
  .route("/cursos/:idcurso/add/modulos")
  .post((req, res) => cursoController.addModule(req, res));

// rotas de módulo
// cria uma aula dentro de um módulo
router
  .route("/cursos/:idcurso/modulos/:idmodulo/add/aula")
  .post((req, res) => cursoController.addAula(req, res));

// rotas de módulo

router
  .route("/cursos/:idcurso/modulos/add/question")
  .post((req, res) => cursoController.addQuestion(req, res));

router
  .route("/cursos/:idcurso/modulos/questions")
  .get((req, res) => cursoController.getQuestions(req, res));

module.exports = router;
