module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    contractorName: DataTypes.STRING,
    company: DataTypes.STRING,
    roofSize: DataTypes.INTEGER,
    roofType: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    projectDate: DataTypes.DATE,
  });

  return Quote;
};
