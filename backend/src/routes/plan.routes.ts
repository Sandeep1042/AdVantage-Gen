import express from "express";
import { getPlans, seedPlans } from "../controllers/plan.controller";

const router = express.Router();

router.get("/", getPlans);
router.post("/seed", seedPlans);

export default router;
