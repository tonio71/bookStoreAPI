import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Autor from "./author.model.js";

const Livro = db.define(
  "livros",
  {
    livroId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    estoque: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    autorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

Livro.belongsTo(Autor, { foreignKey: "autorId" });
Livro.sync();
export default Livro;
