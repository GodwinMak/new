const db = require("../model");
const { Sequelize,Op, fn, col } = require("sequelize");
const Report = db.reports;
const AddmitedPatient = db.patient_datas;
const Patient = db.patients;
const ReportData = db.report_datas;

const moment = require("moment-timezone");

exports.createReport = async (req, res) => {
  try {
    const { report_name, report_date, hospital_id, user_id } = req.body;

    // const check = await Report.findOne({ where: { report_date: report_date } });

    // if (check) {
    //   return res
    //     .status(409)
    //     .json({ message: "Report on this month aready created" });
    // }
    const report = await Report.create({
      report_name: report_name,
      report_date: report_date,
      hospital_id: hospital_id,
      user_id: user_id,
    });
    res.status(200).json({ message: "Report Created", report });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.createReportData = async (req, res) => {
  try {
    const reportData = await ReportData.create(req.body);
    res.status(200).json({ message: "Report Data Created", reportData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
exports.getReport = async (req, res) => {
  try {
    const report = await Report.findAll();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
exports.getReportData = async (req, res) => {
  try {
    const id = req.params.id

    const reportData = await ReportData.findOne({where: {report_id: id}});
    console.log(reportData)

    res.status(200).json(reportData)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};

exports.getPatientData1 = async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const year = date.getFullYear();

    const startDate = new Date(year, month - 1, 1);
    startDate.setHours(
      startDate.getHours() - startDate.getTimezoneOffset() / 60
    );

    const endDate = new Date(year, month, 0);
    endDate.setHours(endDate.getHours() - endDate.getTimezoneOffset() / 60);
    
    const patientCounts = await AddmitedPatient.findOne({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND patient_data.test_result = 'Stuning' THEN 1 ELSE 0 END`
            )
          ),
          "under5StuningMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND patient_data.test_result = 'Stuning' THEN 1 ELSE 0 END`
            )
          ),
          "under5StuningFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND patient_data.test_result IS NOT NULL THEN 1 ELSE 0 END`
            )
          ),
          "under5TotalMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND patient_data.test_result IS NOT NULL THEN 1 ELSE 0 END`
            )
          ),
          "under5TotalFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND patient_data.recommendation = 'Admited' AND patient_data.status IS NULL THEN 1 ELSE 0 END`
            )
          ),
          "under5AdmittedMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND patient_data.recommendation = 'Admited' AND patient_data.status IS NULL THEN 1 ELSE 0 END`
            )
          ),
          "under5Admittedfemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND  patient_data.status = 'Released' THEN 1 ELSE 0 END`
            )
          ),
          "under5ReleasedMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND  patient_data.status = 'Released' THEN 1 ELSE 0 END`
            )
          ),
          "under5ReleasedFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN  TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND  patient_data.status = 'Left treatment' THEN 1 ELSE 0 END`
            )
          ),
          "under5LeftTreatmentMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND  patient_data.status = 'Left treatment' THEN 1 ELSE 0 END`
            )
          ),
          "under5LeftTreatmentFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND  patient_data.status = 'Death' THEN 1 ELSE 0 END`
            )
          ),
          "under5DeathMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND  patient_data.status = 'Death' THEN 1 ELSE 0 END`
            )
          ),
          "under5Deathfemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND  patient_data.test_result = 'Wasting' THEN 1 ELSE 0 END`
            )
          ),
          "under5WastingMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND  patient_data.test_result = 'Wasting' THEN 1 ELSE 0 END`
            )
          ),
          "under5Wastingfemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'male' AND  patient_data.test_result = 'Over weight' THEN 1 ELSE 0 END`
            )
          ),
          "under5OverweightMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 5 AND patient.gender = 'female' AND  patient_data.test_result = 'Over weight' THEN 1 ELSE 0 END`
            )
          ),
          "under5Overweightfemale",
        ],
        // ... Add similar attributes for each condition you want to count
      ],
      include: [
        {
          model: Patient,
          attributes: [],
          require: true,
          where: {
            gender: {
              [Op.in]: ["male", "female"],
            },
          },
        },
      ],
      raw: true,
    });
    res.status(200).json(patientCounts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};


exports.getPatientData2 = async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const year = date.getFullYear();

    const startDate = new Date(year, month - 1, 1);
    startDate.setHours(
      startDate.getHours() - startDate.getTimezoneOffset() / 60
    );

    const endDate = new Date(year, month, 0);
    endDate.setHours(endDate.getHours() - endDate.getTimezoneOffset() / 60);

    const patientCounts = await AddmitedPatient.findOne({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'male' AND patient_data.test_result = 'Stuning' THEN 1 ELSE 0 END`
            )
          ),
          "under5StuningMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'female' AND patient_data.test_result = 'Stuning' THEN 1 ELSE 0 END`
            )
          ),
          "under5StuningFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'male' AND patient_data.test_result = 'Wasting' THEN 1 ELSE 0 END`
            )
          ),
          "under5WastingMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'female' AND patient_data.test_result = 'Wasting' THEN 1 ELSE 0 END`
            )
          ),
          "under5WastingFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'male' AND patient_data.test_result = 'Underweight' THEN 1 ELSE 0 END`
            )
          ),
          "under5UnderweightMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'female' AND patient_data.test_result = 'Underweight' THEN 1 ELSE 0 END`
            )
          ),
          "under5UnderweightFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'male' AND patient_data.test_result = 'Inadequet Vitamins' THEN 1 ELSE 0 END`
            )
          ),
          "under5InadequetVitaminsMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'female' AND patient_data.test_result = 'Inadequet Vitamins' THEN 1 ELSE 0 END`
            )
          ),
          "under5InadequetVitaminsFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'male' AND patient_data.test_result = 'Over weight' THEN 1 ELSE 0 END`
            )
          ),
          "under5OverweightMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) > 60 AND patient.gender = 'female' AND patient_data.test_result = 'Over weight' THEN 1 ELSE 0 END`
            )
          ),
          "under5OverweightFemale",
        ],
        // ... Add similar attributes for each condition you want to count
      ],
      include: [
        {
          model: Patient,
          attributes: [],
          require: true,
          where: {
            gender: {
              [Op.in]: ["male", "female"],
            },
          },
        },
      ],
      raw: true,
    });
    res.status(200).json(patientCounts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};


exports.getPatientData3 = async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const year = date.getFullYear();

    const startDate = new Date(year, month - 1, 1);
    startDate.setHours(
      startDate.getHours() - startDate.getTimezoneOffset() / 60
    );

    const endDate = new Date(year, month, 0);
    endDate.setHours(endDate.getHours() - endDate.getTimezoneOffset() / 60);

    const patientCounts = await AddmitedPatient.findOne({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'male' AND patient_data.test_result = 'Stuning' THEN 1 ELSE 0 END`
            )
          ),
          "under5StuningMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'female' AND patient_data.test_result = 'Stuning' THEN 1 ELSE 0 END`
            )
          ),
          "under5StuningFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'male' AND patient_data.test_result = 'Wasting' THEN 1 ELSE 0 END`
            )
          ),
          "under5WastingMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'female' AND patient_data.test_result = 'Wasting' THEN 1 ELSE 0 END`
            )
          ),
          "under5WastingFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'male' AND patient_data.test_result = 'Underweight' THEN 1 ELSE 0 END`
            )
          ),
          "under5UnderweightMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'female' AND patient_data.test_result = 'Underweight' THEN 1 ELSE 0 END`
            )
          ),
          "under5UnderweightFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'male' AND patient_data.test_result = 'Inadequet Vitamins' THEN 1 ELSE 0 END`
            )
          ),
          "under5InadequetVitaminsMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'female' AND patient_data.test_result = 'Inadequet Vitamins' THEN 1 ELSE 0 END`
            )
          ),
          "under5InadequetVitaminsFemale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'male' AND patient_data.test_result = 'Over weight' THEN 1 ELSE 0 END`
            )
          ),
          "under5OverweightMale",
        ],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal(
              `CASE WHEN TIMESTAMPDIFF(YEAR, patient.birth_date, NOW()) < 60 AND patient.gender = 'female' AND patient_data.test_result = 'Over weight' THEN 1 ELSE 0 END`
            )
          ),
          "under5OverweightFemale",
        ],
        // ... Add similar attributes for each condition you want to count
      ],
      include: [
        {
          model: Patient,
          attributes: [],
          require: true,
          where: {
            gender: {
              [Op.in]: ["male", "female"],
            },
          },
        },
      ],
      raw: true,
    });
    res.status(200).json(patientCounts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error });
  }
};

