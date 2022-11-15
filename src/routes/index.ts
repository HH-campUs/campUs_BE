import { Router } from 'express';

const router = Router();

router.use('/', async (req, res, next) => {
  res.send('인덱스 확인용 나중에 수정해서 사용');
});

export default router;
