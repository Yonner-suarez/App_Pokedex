const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  //modelo que definira la tabla correpsondientes a los usuarios que ingresen y se registren en la app, servira para relacionar sus pokemons creados con su identificador correspondiente
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
