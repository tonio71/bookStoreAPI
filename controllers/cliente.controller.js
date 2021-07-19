import ClienteService from "../services/cliente.service.js";

async function createCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error("Nome e telefone são campos obrigatórios!");
    }
    cliente = await ClienteService.createCliente(cliente);
    res.send(cliente);
    logger.info(`Post /cliente - ${JSON.stringfy(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
    logger.info(`Get /cliente`);
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
  try {
    res.send(await ClienteService.getCliente(req.params.id));
    logger.info(`Get /cliente`);
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req, res, next) {
  try {
    let retorno = await ClienteService.deleteCliente(req.params.id);
    if (retorno === null) {
      res.status(404).send("cliente não encontrado!");
    } else {
      res.send("");
    }
    logger.info(`Delete /cliente`);
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.clienteId ||
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        "Cliente_id, Name, CPF, Phone, Email e Address são campos obrigatórios!"
      );
    }
    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    logger.info(`Update using PUT /cliente - ${JSON.stringfy(cliente)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
};
