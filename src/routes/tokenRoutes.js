import { Router } from 'express';

import TokenController from '../controllers/TokenController';

const router = new Router();

router.post("/token/", TokenController.store);
router.post("/verify/", TokenController.verifyToken);

export default router;