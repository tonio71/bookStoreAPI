import ClienteRepository from "../repositories/cliente.repository.js";
import SaleRepository from "../repositories/sale.repository.js";

async function createCliente(cliente) {
  return ClienteRepository.insertCliente(cliente);
}

async function getClientes() {
  let clientes = await ClienteRepository.getClientes();
  for (let index = 0; index < clientes.length; index++) {
    delete clientes[index].dataValues.senha;
  }
  return clientes;
}

async function getCliente(id) {
  let cliente = await ClienteRepository.getCliente(id);
  if (cliente) {
    delete cliente.dataValues.senha;
  }
  return cliente;
}

async function deleteCliente(id) {
  const venda = await SaleRepository.getSalesByClienteId(id);
  if (venda.length === 0) {
    return ClienteRepository.deleteCliente(id);
  }
  throw new Error("Exclusão negada! Cliente possui compras.");
}

async function updateCliente(cliente) {
  if(global.userName != cliente.email && global.userName != 'admin'){
    throw new Error("Cliente pode alterar apenas seus próprios dados!");
  }
  const old = await getCliente(cliente.clienteId);
  if (old) {
    return ClienteRepository.updateCliente(cliente);
  } else {
    throw new Error("Cliente não encontrado!");
  }
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
};
