import AuthorRepository from "../repositories/author.repository.js";
//import AnimalRepository from "../repositories/animal.repository.js";

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
  /* const animal = await AnimalRepository.getAnimaisByAuthorId(id);
  if (animal.length === 0) {
    return AuthorRepository.deleteAuthor(id);
  }
  throw new Error("Exclusão negada! Proprietário possui animal(is).");*/
  return AuthorRepository.deleteAuthor(id);
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
