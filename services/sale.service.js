import SaleRepository from "../repositories/sale.repository.js";
import ClienteService from "../services/cliente.service.js";
import LivroService from "../services/book.service.js";

async function createSale(sale) {
  const cliente = await ClienteService.getCliente(sale.clienteId);
  if (!cliente) {
    throw new Error("O cliente deve estar cadastrado!");
  }

  let livro = await LivroService.getBook(sale.livroId);
  if (!livro) {
    throw new Error("O livro deve estar cadastrado!");
  }
  livro = livro.dataValues;
  if (livro.estoque === 0) {
    throw new Error("Livro sem exemplares no estoque!");
  }

  livro.estoque--;
  const x = await LivroService.updateBook(livro);
  sale.valor = livro.valor;
  return SaleRepository.insertSale(sale);
}

async function getSales(clienteId, livroId, autorId) {
  if (clienteId) {
    return SaleRepository.getSalesByClienteId(clienteId);
  }
  if (livroId) {
    return SaleRepository.getSalesByLivroId(livroId);
  }
  if (autorId) {
    return SaleRepository.getSalesByAutorId(autorId);
  }
  return SaleRepository.getSales();
}

async function getSale(id) {
  return SaleRepository.getSale(id);
}

async function deleteSale(id) {
  /* const animal = await AnimalRepository.getAnimaisBySaleId(id);
  if (animal.length === 0) {
    return SaleRepository.deleteSale(id);
  }
  throw new Error("Exclusão negada! Proprietário possui animal(is).");*/
  return SaleRepository.deleteSale(id);
}

async function updateSale(sale) {
  const old = await getSale(sale.livroId);
  if (old) {
    return SaleRepository.updateSale(sale);
  } else {
    throw new Error("Sale não encontrado!");
  }
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
