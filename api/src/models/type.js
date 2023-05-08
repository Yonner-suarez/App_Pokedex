const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  //tendra un identificador pero no universal sino autoincrementador estos tippos no tiene el riesgode pizarse con nada
  sequelize.define(
    "Type",
    {
      slot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
