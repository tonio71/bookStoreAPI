import AuthorRepository from "../repositories/author.repository.js";
import BookRepository from "../repositories/book.repository.js";

async function createAuthor(author) {
  return AuthorRepository.insertAuthor(author);
}

async function getAuthors() {
  return AuthorRepository.getAuthors();
}

async function getAuthor(id) {
  return AuthorRepository.getAuthor(id);
}

async function deleteAuthor(id) {
  const livros = await BookRepository.getBooksByAuthorId(id);
  if (livros.length === 0) {
    return AuthorRepository.deleteAuthor(id);
  }
  throw new Error("Exclusão negada! Autor possui livros cadastrados.");
}

async function updateAuthor(author) {
  const old = await getAuthor(author.autorId);
  if (old) {
    return AuthorRepository.updateAuthor(author);
  } else {
    throw new Error("Author não encontrado!");
  }
}

export default {
  createAuthor,
  getAuthors,
  getAuthor,
  deleteAuthor,
  updateAuthor,
};
