import {Router} from 'express';
import Camp from '../camp/campControl';

const router = Router();

router.get('/', Camp.getAllCamp);

export default router;