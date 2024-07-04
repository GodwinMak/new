module.exports = (sequelize, DataTypes) => {
    const PatientData = sequelize.define("patient_data", {
      patient_data_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      type_of_patient: {
        type: DataTypes.ENUM(
          "Child",
          "Pregnant Woman",
          "Elderly",
          "Normal Patient"
        ),
        allowNull: false,
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      test_made: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      test_result: {
        type: DataTypes.ENUM(
          "Wasting",
          "Stuning",
          "Underweight",
          "Inadequet Vitamins",
          "Over weight",
          "Obesity"
        ),
        allowNull: true,
      },
      treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      recommendation: {
        type: DataTypes.ENUM("Referal", "Admited"),
        allowNull: true,
      },
      payment_method: {
        type: DataTypes.ENUM("Insurance", "Cash", "Forgiven"),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Released", "Left treatment", "Death"),
        allowNull: true,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patients", // Assuming your area model is named 'area'; adjust this if needed
          key: "patient_id",
        },
      },
    });
    return PatientData;
}