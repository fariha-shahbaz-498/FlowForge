import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getProjects);

router.post("/", createProject);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

export default router;