const router = require("express").Router();
const {create, getAll} = require("../controllers/patientController")


router.post("/", create);
router.get("/", getAll)


module.exports = router;