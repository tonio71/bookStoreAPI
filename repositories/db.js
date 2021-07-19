import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "postgres://citnekct:mdpNKj0N54pRoYPROw8-mNx7dkvK2v0_@tuffi.db.elephantsql.com/citnekct",
  {
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  }
);

export default sequelize;
