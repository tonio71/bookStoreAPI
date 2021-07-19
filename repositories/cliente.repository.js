import DB from "./db.js";
import Cliente from "../models/cliente.model.js";

async function insertCliente(cliente) {
  try {
    return await Cliente.create(cliente);
  } catch (err) {
    throw err;
  }
}

async function getCliente(id) {
  try {
    return await Cliente.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function getClientes() {
  try {
    return await Cliente.findAll();
  } catch (err) {
    throw err;
  }
}

async function deleteCliente(id) {
  try {
    await Cliente.destroy({
      where: { clienteId: id },
    });
  } catch (err) {
    throw err;
  }
}

async function updateCliente(cliente) {
  try {
    await Cliente.update(cliente, {
      where: { clienteId: cliente.clienteId },
    });
    return getCliente(cliente.clienteId);
  } catch (err) {
    throw err;
  }
}

export default {
  insertCliente,
  getCliente,
  getClientes,
  updateCliente,
  deleteCliente,
};
