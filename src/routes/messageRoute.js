import { Router } from 'express';
import loginrequired from '../midddlewares/loginrequired';
import MessageController from '../controllers/MessageController';

const router = new Router();

router.post('/message/', loginrequired, MessageController.sendMessageText);
router.post('/media/', loginrequired, MessageController.sendMessageMedia);
router.get('/monitoring/', loginrequired, MessageController.monitoring);

export default router;