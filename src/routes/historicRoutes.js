import { Router } from 'express';
import HistoricController from '../controllers/HistoricController';
import loginrequired from '../midddlewares/loginrequired';

const router = new Router();

router.post('/historic/', loginrequired, HistoricController.store);
router.get('/historic/', loginrequired, HistoricController.show);
router.get('/historics/', loginrequired, HistoricController.index);
router.patch('/historic/:id', loginrequired, HistoricController.update);
router.delete('/historic/:id', loginrequired, HistoricController.delete);

export default router;