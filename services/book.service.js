import BookRepository from "../repositories/book.repository.js";
import BookInfoRepository from "../repositories/bookInfo.repository.js";
import AuthorRepository from "../repositories/author.repository.js";
import SaleRepository from "../repositories/sale.repository.js";

async function createBook(book) {
  const autor = await AuthorRepository.getAuthor(book.autorId);
  if (autor) {
    return BookRepository.insertBook(book);
  }
  throw new Error("O autor deve estar cadastrado!");
}

async function getBooks(autorId) {
  if (autorId) {
    return BookRepository.getBooksByAuthorId(autorId);
  }
  return BookRepository.getBooks();
}

async function getBook(id) {
  let livro = await BookRepository.getBook(id);
  if (livro) {
    livro.dataValues.info = await BookInfoRepository.getBookInfo(parseInt(id));
  }
  return livro;
}

async function deleteBook(id) {
  const animal = await SaleRepository.getSalesByLivroId(id);
  if (animal.length === 0) {
    return BookRepository.deleteBook(id);
  }
  throw new Error("Exclusão negada! O livro possui vendas cadastradas.");
}

async function updateBook(book) {
  const old = await getBook(book.livroId);
  if (old) {
    return BookRepository.updateBook(book);
  } else {
    throw new Error("Book não encontrado!");
  }
}

export default {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
};
