import { Router } from 'express';
import MensagemController from '../controllers/MensagemController';
import loginrequired from '../midddlewares/loginrequired';

const router = new Router();

router.post('/mensagem/', loginrequired, MensagemController.store);
router.get('/mensagem/', loginrequired, MensagemController.show);
router.get('/mensagens/', loginrequired, MensagemController.index);
router.patch('/mensagem/:id', loginrequired, MensagemController.update);
router.delete('/mensagem/:id', loginrequired, MensagemController.delete);

export default router;