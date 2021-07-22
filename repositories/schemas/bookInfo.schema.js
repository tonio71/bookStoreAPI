import mongoose from "mongoose";
import AvaliacoesSchema from "./avaliacoes.schema.js";

const BookInfoSchema = new mongoose.Schema(
  {
    livroId: Number,
    descricao: String,
    paginas: Number,
    editora: String,
    avaliacoes: [AvaliacoesSchema],
  },
  { collection: "bookInfo" }
);

export default BookInfoSchema;
