'use strict';

/**
 * Licitation model definition
 */
module.exports = (sequelize, DataTypes) => {
  const Licitation = sequelize.define('Licitation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true,
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notEmpty: true,
        validateEndDate(value) {
          if (this.startDate && new Date(value) <= new Date(this.startDate)) {
            throw new Error('End date must be after start date');
          }
        }
      }
    },
    isLowestPrice: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'licitations',
    timestamps: true, // Enables createdAt and updatedAt
  });

  // Model associations
  Licitation.associate = (models) => {
    Licitation.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator'
    });
  };

  return Licitation;
};