import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Cliente from "./client.model.js";
import Livro from "./book.model.js";

const Venda = db.define(
  "vendas",
  {
    vendaId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    valor: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    clienteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    livroId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

Venda.belongsTo(Cliente, { foreignKey: "clienteId" });
Venda.belongsTo(Livro, { foreignKey: "livroId" });

Venda.sync();
export default Venda;
