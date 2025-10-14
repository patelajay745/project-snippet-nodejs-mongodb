import { Router } from "express";

import { handleWebhook } from "@/controllers/clerk.controller";

const router = Router();

router.post("/", handleWebhook)

export default router;