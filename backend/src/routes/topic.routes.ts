import { Router } from "express";
import { RoleType } from "~/constants/enums";
import * as topicController from "~/controllers/topic.controllers";
import { auth, isRole, attachUserRole } from "~/middlewares/auth.middlewares";

const topicRouter = Router();

topicRouter.get("/", auth, attachUserRole, topicController.getAll);
topicRouter.get("/:id", auth, attachUserRole, topicController.getDetail);

topicRouter.post("/", auth, attachUserRole, isRole([RoleType.ADMIN]), topicController.create);
topicRouter.patch("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), topicController.update);
topicRouter.delete("/:id", auth, attachUserRole, isRole([RoleType.ADMIN]), topicController.deleteTopic);

export default topicRouter;
