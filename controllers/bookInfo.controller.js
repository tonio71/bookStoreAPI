import BookService from "../services/bookInfo.service.js";

async function createBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    if (!bookInfo.livroId) {
      throw new Error("Book ID é obrigatório.");
    }
    console.log("CreateBookInfo controller......");

    await BookService.createBookInfo(bookInfo);
    res.end();
    logger.info(`POST /bookInfo - ${JSON.stringify(bookInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function updateBookInfo(req, res, next) {
  try {
    let bookInfo = req.body;
    if (!bookInfo.livroId) {
      throw new Error("Book ID é obrigatório.");
    }
    await BookService.updateBookInfo(bookInfo);
    res.end();
    logger.info(`PUT /book/info - ${JSON.stringify(bookInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function getBooksInfo(req, res, next) {
  try {
    res.send(await BookService.getBooksInfo());
    logger.info("GET /book/info");
  } catch (err) {
    next(err);
  }
}

async function getBookInfo(req, res, next) {
  try {
    res.send(await BookService.getBookInfo(req.params.id));
    logger.info("GET /bookinfo");
  } catch (err) {
    next(err);
  }
}

async function deleteBookInfo(req, res, next) {
  try {
    res.send(await BookService.deleteBookInfo(parseInt(req.params.id)));
    logger.info("DELETE /book/info");
  } catch (err) {
    next(err);
  }
}

async function createAvaliacao(req, res, next) {
  try {
    let params = req.body;
    if (!params.livroId || !params.avaliacao) {
      throw new Error("Book ID e Avaliacao são obrigatórios.");
    }
    await BookService.createAvaliacao(params.avaliacao, params.livroId);
    logger.info(`POST /bookInfo Avaliacao`);
    res.end();
  } catch (err) {
    next(err);
  }
}

async function deleteAvaliacao(req, res, next) {
  try {
    await BookService.deleteAvaliacao(req.params.id, req.params.index);
    logger.info(`DELETE /bookInfo/${req.params.id}/review/${req.params.index}`);
    res.end();
  } catch (err) {
    next(err);
  }
}

export default {
  createBookInfo,
  updateBookInfo,
  createAvaliacao,
  deleteAvaliacao,
  getBooksInfo,
  getBookInfo,
  deleteBookInfo,
};
