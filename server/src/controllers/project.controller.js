import Project from "../models/Project.js";

// ===============================
// GET ALL PROJECTS
// ===============================
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

// ===============================
// CREATE PROJECT
// ===============================
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      progress,
      budget,
      deadline,
      favorite,
      pinned,
      tags,
    } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user._id,
      status,
      priority,
      progress,
      budget,
      deadline,
      favorite,
      pinned,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to create project",
    });
  }
};

// ===============================
// UPDATE PROJECT
// ===============================
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.title = req.body.title ?? project.title;
    project.description = req.body.description ?? project.description;
    project.status = req.body.status ?? project.status;
    project.priority = req.body.priority ?? project.priority;
    project.progress = req.body.progress ?? project.progress;
    project.budget = req.body.budget ?? project.budget;
    project.deadline = req.body.deadline ?? project.deadline;
    project.favorite = req.body.favorite ?? project.favorite;
    project.pinned = req.body.pinned ?? project.pinned;
    project.tags = req.body.tags ?? project.tags;
    project.members = req.body.members ?? project.members;

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to update project",
    });
  }
};

// ===============================
// DELETE PROJECT
// ===============================
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete project",
    });
  }
};