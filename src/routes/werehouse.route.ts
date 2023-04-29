import { Router } from "express";
import { selectPositions } from "../controllers/werehouse.controller";

const router = Router();

router.post("/", selectPositions);

export { router as werehouseRoutes };
