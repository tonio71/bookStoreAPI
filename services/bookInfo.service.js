import BookInfoRepository from "../repositories/bookInfo.repository.js";

async function createBookInfo(bookInfo) {
  await BookInfoRepository.createBookInfo(bookInfo);
}

async function updateBookInfo(bookInfo) {
  await BookInfoRepository.updateBookInfo(bookInfo);
}

async function getBooksInfo() {
  return await BookInfoRepository.getBooksInfo();
}

async function getBookInfo(livroId) {
  return await BookInfoRepository.getBookInfo(livroId);
}

async function deleteBookInfo(livroId) {
  await BookInfoRepository.deleteBookInfo(livroId);
}

async function createAvaliacao(avaliacao, bookId) {
  await BookInfoRepository.createAvaliacao(avaliacao, bookId);
}

async function deleteAvaliacao(livroId, index) {
  await BookInfoRepository.deleteAvaliacao(parseInt(livroId), index);
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
