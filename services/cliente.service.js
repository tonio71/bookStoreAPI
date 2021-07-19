import ClienteRepository from "../repositories/cliente.repository.js";
//import AnimalRepository from "../repositories/animal.repository.js";

async function createCliente(cliente) {
  return ClienteRepository.insertCliente(cliente);
}

async function getClientes() {
  return ClienteRepository.getClientes();
}

async function getCliente(id) {
  return ClienteRepository.getCliente(id);
}

async function deleteCliente(id) {
  /* const animal = await AnimalRepository.getAnimaisByClienteId(id);
  if (animal.length === 0) {
    return ClienteRepository.deleteCliente(id);
  }
  throw new Error("Exclusão negada! Proprietário possui animal(is).");*/
  return ClienteRepository.deleteCliente(id);
}

async function updateCliente(cliente) {
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
