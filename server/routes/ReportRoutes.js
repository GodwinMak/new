const router = require("express").Router();

const {
  createReport,
  createReportData,
  getReport,
  getPatientData1,
  getPatientData2,
  getPatientData3,
  getReportData,
} = require("../controllers/ReportController");

router.post("/", createReport);
router.post("/reportdata", createReportData);
router.get("/", getReport);
router.get("/patientdata1", getPatientData1);
router.get("/patientdata2", getPatientData2);
router.get("/patientdata3", getPatientData3);
router.get("/reportdata/:id", getReportData);


module.exports = router;
