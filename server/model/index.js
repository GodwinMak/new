const dbConfig = require("../config/dbConfig.js");
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, { 
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.hospitals = require("./hospitalModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
db.patients = require("./patientModel.js")(sequelize, DataTypes);
db.patient_datas = require("./patientData.js")(sequelize, DataTypes);
db.reports = require("./reportModel.js")(sequelize, DataTypes);
db.report_datas = require("./ReportData.js")(sequelize, DataTypes);


// Define associations after defining all models
db.hospitals.hasMany(db.users, { foreignKey: "hospital_id" });
db.hospitals.hasMany(db.patients, { foreignKey: "hospital_id" });
db.hospitals.hasMany(db.reports, { foreignKey: "hospital_id" });
db.reports.belongsTo(db.hospitals, { foreignKey: "hospital_id" });
db.users.belongsTo(db.hospitals, { foreignKey: "hospital_id" });
db.patients.belongsTo(db.hospitals, { foreignKey: "hospital_id" });
db.patients.hasMany(db.patient_datas, { foreignKey: "patient_id" });
db.patient_datas.belongsTo(db.patients, {foreignKey: "patient_id"});
db.users.hasMany(db.reports, { foreignKey: "hospital_id" });
db.reports.belongsTo(db.users, { foreignKey: "hospital_id" });
db.reports.hasMany(db.report_datas, { foreignKey: "report_id" });






db.sequelize.sync({force: false}).then(() => {})
.then(() => {
    console.log("Yes re-sync done.");
});

module.exports = db;