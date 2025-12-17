import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import topicRouter from "./topic.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/topics", topicRouter);
export default rootRouter;
