const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  //lo primero que hago es crear los dos modelos que me pide el readme
  //segundo, tengo que ver que son los datos que me esta pidiendo que traiga de la api
  //tercero, me fijo cuales son obligatorios y cuales no, lo determina el * que dice el readme
  //cuarto, tengo que fijarme como vienen los datos asi pongo que tipo de dato son
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resume: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      healthylevel: {
        type: DataTypes.INTEGER,
      },
      stepbystep: {
        type: DataTypes.TEXT,
      },
      //agrego el que yo voy a crear de la base de datos
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      //tambien para tener en cuenta agrego la imagen
      image: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
