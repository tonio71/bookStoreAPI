import Book from "../models/book.model.js";
//import Author from "../models/author.model.js";

async function insertBook(book) {
  try {
    return await Book.create(book);
  } catch (err) {
    throw err;
  }
}

async function getBook(id) {
  try {
    return await Book.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function getBooks() {
  try {
    return await Book.findAll();
  } catch (err) {
    throw err;
  }
}

async function getBooksByAuthorId(id) {
  console.log("id do autor ", id);
  try {
    return await Book.findAll({
      where: { autorId: id },
    });
  } catch (err) {
    throw err;
  }
}

async function deleteBook(id) {
  try {
    await Book.destroy({
      where: { livroId: id },
    });
  } catch (err) {
    throw err;
  }
}

async function updateBook(book) {
  try {
    await Book.update(book, {
      where: { livroId: book.livroId },
    });
    return getBook(book.livroId);
  } catch (err) {
    throw err;
  }
}

export default {
  insertBook,
  getBook,
  getBooks,
  getBooksByAuthorId,
  updateBook,
  deleteBook,
};
