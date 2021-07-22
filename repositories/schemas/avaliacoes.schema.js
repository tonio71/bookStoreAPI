import mongoose from "mongoose";

const AvaliacoesSchema = new mongoose.Schema(
  {
    name: String,
    nota: Number,
    avaliacao: String,
  },
  { collection: "bookInfo" }
);

export default AvaliacoesSchema;
