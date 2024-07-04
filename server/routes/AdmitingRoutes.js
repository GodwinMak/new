const router = require("express").Router();

const {create, getAll, update, checkPatient} = require("../controllers/AdmitingController");

router.post("/", create);
router.get("/", getAll);
router.get("/check/:id", checkPatient)
router.put("/:id", update)

module.exports = router;