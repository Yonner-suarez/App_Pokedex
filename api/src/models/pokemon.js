const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      idPok: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ataque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      defensa: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      velocidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      altura: {
        type: DataTypes.INTEGER,
      },
      peso: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
