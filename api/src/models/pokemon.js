const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  //!modelo para crear una tabla que contenga los pokemons de cada usuario
  // todos los datos deben ser obligatorios ecxepto la altura y el peso
  sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        //un identificador universal para no sobrescribir las id de los pokemons traidos desde la API, sera el que tenga la PK
      },
      idPok: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        //un identificador autoincrementador para poder encontrarlo mas facilmente
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
