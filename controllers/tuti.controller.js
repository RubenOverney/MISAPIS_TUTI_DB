import tuti from '../models/tuti.model.js';
import mongoose from 'mongoose';

// =======================================
// GET ALL
// =======================================
export const getAlltuti = async (req, res) => {
  console.log('Obtener todos los productos de tuti');
  try {
    const producciones = await tuti.find({}, { __v: 0 });
    if (producciones.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron productos en TUTI'
      });
    }

    return res.status(200).json({
      producciones
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener los productos en TUTI'
    });
  }
};

// =======================================
// GET BY ID
// =======================================
export const getTUTIxById = async (req, res) => {
  console.log('Obtener productos por ID');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const produccion = await tuti.findById(id); // <--- CORREGIDO

    if (!produccion) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    return res.status(200).json({ produccion });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener el producto' });
  }
};

// =======================================
// POST
// =======================================
export const postTUTI = async (req, res) => {
  console.log('Agregar nuevo producto a TUTI');

  const body = req.body;
  const nuevaProduccion = new tuti(body); // <--- CORREGIDO

  try {
    const validationError = nuevaProduccion.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        error => error.message
      );
      return res.status(400).json({ errores: errorMessages });
    }

    await nuevaProduccion.save();

    return res.status(201).json({
      msg: 'Producto agregado exitosamente',
      produccion: nuevaProduccion
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al guardar el producto'
    });
  }
};

// =======================================
// PUT
// =======================================
export const putTUTI = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const produccion = await tuti.findByIdAndUpdate(id, body, { // <--- CORREGIDO
      new: true,
      runValidators: true
    });

    if (!produccion) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    return res.status(200).json({
      msg: 'Producto actualizado correctamente',
      produccion
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar el producto'
    });
  }
};

// =======================================
// DELETE
// =======================================
export const deleteTUTI = async (req, res) => {
  console.log('Eliminar producto de TUTI');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const produccion = await tuti.findByIdAndDelete(id); // <--- CORREGIDO

    if (!produccion) {
      return res.status(404).json({ msg: 'producto no encontrado' });
    }

    return res.status(200).json({
      msg: 'producto eliminado correctamente',
      produccion
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al eliminar el producto'
    });
  }
};

