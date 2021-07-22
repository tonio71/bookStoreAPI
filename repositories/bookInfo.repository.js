import BookInfoSchema from "./schemas/bookInfo.schema.js";
import { connect } from "./mongo.db.js";

async function createBookInfo(bookInfo) {
  try {
    const mongoose = await connect();
    console.log("conectado mongoose......");
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    bookInfo = new BookInfo(bookInfo);
    await bookInfo.save();
  } catch (err) {
    throw err;
  }
}

async function updateBookInfo(bookInfo) {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    await BookInfo.findOneAndUpdate({ livroId: bookInfo.livroId }, bookInfo);
  } catch (err) {
    throw err;
  }
}

async function getBookInfo(livroId) {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    const query = BookInfo.findOne({ livroId });
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function getBooksInfo() {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    const query = BookInfo.find({});
    return await query.exec();
  } catch (err) {
    throw err;
  }
}

async function deleteBookInfo(livroId) {
  try {
    const mongoose = await connect();
    const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
    await BookInfo.deleteOne({ livroId });
  } catch (err) {
    throw err;
  }
}

async function createAvaliacao(avaliacao, livroId) {
  try {
    const bookInfo = await getBookInfo(livroId);
    bookInfo.avaliacoes.push(avaliacao);
    await updateBookInfo(bookInfo);
  } catch (err) {
    throw err;
  }
}

async function deleteAvaliacao(livroId, index) {
  try {
    const bookInfo = await getBookInfo(livroId);
    bookInfo.avaliacoes.splice(index, 1);
    await updateBookInfo(bookInfo);
  } catch (err) {
    throw err;
  }
}

export default {
  createBookInfo,
  updateBookInfo,
  getBookInfo,
  createAvaliacao,
  deleteAvaliacao,
  getBooksInfo,
  deleteBookInfo,
};
