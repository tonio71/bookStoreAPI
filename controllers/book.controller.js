import BookService from "../services/book.service.js";

async function createBook(req, res, next) {
  try {
    let book = req.body;
    if (!book.nome || !book.valor || !book.estoque || !book.autorId) {
      throw new Error("Nome, email, estoque e autor são campos obrigatórios!");
    }
    book = await BookService.createBook(book);
    res.send(book);
    logger.info(`Post /book - ${JSON.stringfy(book)}`);
  } catch (err) {
    next(err);
  }
}

async function getBooks(req, res, next) {
  try {
    res.send(await BookService.getBooks(req.query.autorId));
    logger.info(`Get /book`);
  } catch (err) {
    next(err);
  }
}

async function getBook(req, res, next) {
  try {
    res.send(await BookService.getBook(req.params.id));
    logger.info(`Get /book`);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    let retorno = await BookService.deleteBook(req.params.id);
    if (retorno === null) {
      res.status(404).send("book não encontrado!");
    } else {
      res.send("");
    }
    logger.info(`Delete /book`);
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    let book = req.body;
    if (!book.livroId || !book.valor) {
      throw new Error("Book_id, valor são campos obrigatórios!");
    }
    book = await BookService.updateBook(book);
    res.send(book);
    logger.info(`Update using PUT /book - ${JSON.stringfy(book)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
};
