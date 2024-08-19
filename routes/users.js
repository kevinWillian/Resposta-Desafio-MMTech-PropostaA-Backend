import express from 'express';

import get from '../controllers/user/get.js';
import getAll from '../controllers/user/getAll.js';
import update from '../controllers/user/update.js';
import post from '../controllers/user/create.js';
import remove from '../controllers/user/delete.js'
import search from '../controllers/user/search.js'
import count from '../controllers/user/count.js';

const router = express.Router();

router.get('/', getAll);
router.get('/getById/:id', get);
router.get('/search', search);
router.put('/update/:id', update);
router.post('/create', post);
router.delete('/delete/:id', remove);
router.get('/count', count);


export default router;