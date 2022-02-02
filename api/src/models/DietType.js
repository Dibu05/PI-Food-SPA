const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "DietType",
    {
      //en este caso hago exactamente lo mismo que el otro modelo con la diferencia que solo me pide que le pase dos datos
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
    },
    { timestamps: false }
  );
};
