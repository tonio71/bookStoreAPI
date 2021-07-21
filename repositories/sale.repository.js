import Sequelize from "sequelize";
import Sale from "../models/sale.model.js";
import Cliente from "../models/client.model.js";
import Livro from "../models/book.model.js";

async function insertSale(sale) {
  try {
    return await Sale.create(sale);
  } catch (err) {
    throw err;
  }
}

async function getSale(id) {
  try {
    return await Sale.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function getSales() {
  try {
    return await Sale.findAll();
  } catch (err) {
    throw err;
  }
}

async function getSalesByClienteId(id) {
  console.log("id do autor ", id);
  try {
    let vendas = await Sale.findAll({
      include: [{ model: Cliente }, { model: Livro }],
      where: { clienteId: id },
    });
    if (vendas) {
      vendas = excluirCampoSenha(vendas);
    }
    return vendas;
  } catch (err) {
    throw err;
  }
}

async function getSalesByLivroId(id) {
  console.log("id do autor ", id);
  try {
    let vendas = await Sale.findAll({
      include: [{ model: Cliente }, { model: Livro }],
      where: { livroId: id },
    });
    if (vendas) {
      vendas = excluirCampoSenha(vendas);
    }
    return vendas;
  } catch (err) {
    throw err;
  }
}

async function getSalesByAutorId(id) {
  console.log("id do autor ", id);
  try {
    let vendas = await Sale.findAll({
      include: [{ model: Livro, where: { autorId: id } }, { model: Cliente }],
    });
    console.log(vendas);
    if (vendas) {
      vendas = excluirCampoSenha(vendas);
    }
    return vendas;
  } catch (err) {
    throw err;
  }
}

async function deleteSale(id) {
  try {
    await Sale.destroy({
      where: { vendaId: id },
    });
  } catch (err) {
    throw err;
  }
}

async function updateSale(sale) {
  try {
    await Sale.update(sale, {
      where: { vendaId: sale.vendaId },
    });
    return getSale(sale.vendaId);
  } catch (err) {
    throw err;
  }
}

async function excluirCampoSenha(vendas) {
  for (let index = 0; index < vendas.length; index++) {
    delete vendas[index].dataValues.cliente.dataValues.senha;
  }
  return vendas;
}

export default {
  insertSale,
  getSale,
  getSales,
  getSalesByClienteId,
  getSalesByLivroId,
  getSalesByAutorId,
  updateSale,
  deleteSale,
};
