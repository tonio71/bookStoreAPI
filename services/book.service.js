import BookRepository from "../repositories/book.repository.js";
import AuthorRepository from "../repositories/author.repository.js";

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
  return BookRepository.getBook(id);
}

async function deleteBook(id) {
  /* const animal = await AnimalRepository.getAnimaisByBookId(id);
  if (animal.length === 0) {
    return BookRepository.deleteBook(id);
  }
  throw new Error("Exclusão negada! Proprietário possui animal(is).");*/
  return BookRepository.deleteBook(id);
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
