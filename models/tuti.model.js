import mongoose from "mongoose";

const tutiSchema = new mongoose.Schema({
  producto: {
    type: String,
    required: [true, "El producto es obligatorio"]
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"]
  },
  año: {
    type: Number,
    required: [true, "El año de fabricacion es obligatorio"]
  },
  caducidad: {
    type: String,
    required: false
  },
  clasificacion: {
    type: String,
    required: false
  },
  descripcion: {
    type: String,
    required: false
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

const tuti = mongoose.model("Tuti", tutiSchema);

export default tuti;
