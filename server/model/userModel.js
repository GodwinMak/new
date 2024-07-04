module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_type:{
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user"
    },
    hospital_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hospitals",
        key: "hospital_id",
      },
    }
  });
  return User;
};
