import prisma from "../config/db.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        status,
        userId: req.user.id,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
    

// GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(projects);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const addProjectMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const projectId = parseInt(req.params.id);

    const member = await prisma.projectMember.create({
      data: {
        userId,
        projectId,
      },
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROJECT STATUS
export const updateProjectStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const updatedProject =
        await prisma.project.update({
          where: {
            id: Number(id),
          },
          data: {
            status,
          },
        });

      res.json(updatedProject);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to update project",
      });
    }
  };