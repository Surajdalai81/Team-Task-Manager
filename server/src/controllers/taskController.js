import prisma from "../config/db.js";

// CREATE TASK
export const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      dueDate,
      assignedTo,
      projectId,
    } = req.body;

    const task =
      await prisma.task.create({
        data: {
          title,
          description,

          status: "PENDING",

          dueDate: new Date(
            dueDate
          ),

          assignedTo: Number(
            assignedTo
          ),

          projectId: Number(
            projectId
          ),

          createdBy: req.user.id,
        },
      });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Failed to create task",
    });
  }
};

// GET TASKS
export const getTasks = async (
  req,
  res
) => {
  try {
    const tasks =
      await prisma.task.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Failed to fetch tasks",
    });
  }
};

// UPDATE TASK STATUS
export const updateTaskStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const updatedTask =
        await prisma.task.update({
          where: {
            id: Number(id),
          },
          data: {
            status,
          },
        });

      res.json(updatedTask);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to update task",
      });
    }
  };

// DELETE TASK
export const deleteTask = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Failed to delete task",
    });
  }
};