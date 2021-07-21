import AuthorService from "../services/author.service.js";

async function createAuthor(req, res, next) {
  try {
    let author = req.body;
    if (!author.nome || !author.email || !author.telefone) {
      throw new Error("Nome, email e telefone são campos obrigatórios!");
    }
    author = await AuthorService.createAuthor(author);
    res.send(author);
    logger.info(`Post /author - ${JSON.stringfy(author)}`);
  } catch (err) {
    next(err);
  }
}

async function getAuthors(req, res, next) {
  try {
    res.send(await AuthorService.getAuthors());
    logger.info(`Get /author`);
  } catch (err) {
    next(err);
  }
}

async function getAuthor(req, res, next) {
  try {
    res.send(await AuthorService.getAuthor(req.params.id));
    logger.info(`Get /author`);
  } catch (err) {
    next(err);
  }
}

async function deleteAuthor(req, res, next) {
  try {
    let retorno = await AuthorService.deleteAuthor(req.params.id);
    if (retorno === null) {
      res.status(404).send("author não encontrado!");
    } else {
      res.send("");
    }
    logger.info(`Delete /author`);
  } catch (err) {
    next(err);
  }
}

async function updateAuthor(req, res, next) {
  try {
    let author = req.body;
    if (!author.autorId || !author.nome || !author.email || !author.telefone) {
      throw new Error(
        "Author_id, Name, Email e telefone são campos obrigatórios!"
      );
    }
    author = await AuthorService.updateAuthor(author);
    res.send(author);
    logger.info(`Update using PUT /author - ${JSON.stringfy(author)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAuthor,
  getAuthors,
  getAuthor,
  deleteAuthor,
  updateAuthor,
};
