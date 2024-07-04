module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('report', {
        report_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        report_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        report_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hospital_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Report
}