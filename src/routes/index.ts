import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.send('연결확인용 인덱스');
});

export default router;
