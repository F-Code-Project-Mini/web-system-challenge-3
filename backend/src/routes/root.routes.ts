import { Router } from 'express';
import adminRouter from './admin.routes';
import authRouter from './auth.routes';
import judgeRouter from './judge.routes';
import mentorRouter from './mentor.routes';
import teamRouter from './team.routes';
import topicRouter from './topic.routes';
import userRouter from './user.routes';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/topics', topicRouter);
rootRouter.use('/teams', teamRouter);
rootRouter.use('/mentor', mentorRouter);
rootRouter.use('/judge', judgeRouter);
rootRouter.use('/admin', adminRouter);
export default rootRouter;
