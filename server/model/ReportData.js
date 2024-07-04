module.exports = (sequelize, DataTypes) => {
    const ReportData = sequelize.define("report_data", {
      report_data_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      giving_services: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      giving_other_services: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      rights_for_service: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      home_made_food: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      industrial_food: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      have_food: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      report_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "reports",
          key: "report_id",
        },
      },
    });
    return ReportData
}