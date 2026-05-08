import prisma from "../config/db.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await prisma.task.count();

    const completedTasks = await prisma.task.count({
      where: {
        status: "COMPLETED",
      },
    });

    const pendingTasks = await prisma.task.count({
      where: {
        status: "PENDING",
      },
    });

    const overdueTasks = await prisma.task.count({
      where: {
        dueDate: {
          lt: new Date(),
        },
        status: {
          not: "COMPLETED",
        },
      },
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};