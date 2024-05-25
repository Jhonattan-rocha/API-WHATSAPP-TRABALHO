import { Router } from 'express';
import loginrequired from '../midddlewares/loginrequired';
import ArquivosController from '../controllers/ArquivosController';

const router = new Router();

router.post('/file/', loginrequired, ArquivosController.store);
router.get('/files/', loginrequired, ArquivosController.index);
router.post('/download/', loginrequired, ArquivosController.show);
router.patch('/file/:id', loginrequired, ArquivosController.update);
router.delete('/file/:id', loginrequired, ArquivosController.delete);

export default router;