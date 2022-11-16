import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import Review from '../../database/models/review';

const router = Router();

res.status(200).json({
    data:await Review.findAll()

export default router