const router = require("express").Router();

// curso router
const cursoRouter = require("./curso.js");

router.use("/", cursoRouter);

module.exports = router;
