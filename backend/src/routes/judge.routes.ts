import { Router } from "express";
import { RoleType } from "~/constants/enums";
import { auth, isRole } from "~/middlewares/auth.middlewares";
import * as judgeController from "~/controllers/judge.controllers";

const judgeRouter = Router();

judgeRouter.get("/rooms", auth, isRole([RoleType.JUDGE]), judgeController.getJudgeRooms);

judgeRouter.get("/rooms/:roomId/teams", auth, isRole([RoleType.JUDGE]), judgeController.getTeamsByRoom);

export default judgeRouter;
