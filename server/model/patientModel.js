module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("patient", {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    village: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: false,
    },
    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hospitals",
        key: "hospital_id",
      },
    },
  });
  return Patient;
};
