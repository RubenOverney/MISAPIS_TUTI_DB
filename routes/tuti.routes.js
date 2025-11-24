
import { Router } from 'express';
import {
  getAlltuti,
  getTUTIxById,
  postTUTI,
  putTUTI,
  deleteTUTI
} from '../controllers/tuti.controller.js';

const tuti = Router();

tuti.get('/', getAlltuti);
tuti.get('/:id', getTUTIxById);
tuti.post('/', postTUTI);
tuti.put('/:id', putTUTI);
tuti.delete('/:id', deleteTUTI);

export default tuti;
