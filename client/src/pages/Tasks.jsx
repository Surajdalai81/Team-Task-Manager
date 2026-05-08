import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  FaTasks,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaRegCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [newTask, setNewTask] =
    useState({
      title: "",
      description: "",
      dueDate: "",
      assignedTo: "",
      projectId: "",
    });

  // LOAD TASKS
 useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data } = await API.get("/api/tasks");

        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadTasks();
  }, []);

  // FETCH TASKS
  
  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "40px",
        width: "100%",
      }}
    >
      {/* MAIN CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "1250px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            width: "100%",
            marginBottom: "40px",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            background: "white",
            padding: "28px 35px",
            borderRadius: "22px",
            boxShadow:
              "0 4px 18px rgba(0,0,0,0.08)",
            border:
              "1px solid #e5e7eb",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "46px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px",
                letterSpacing: "-1px",
              }}
            >
              Tasks Workspace
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: "17px",
                lineHeight: "1.6",
              }}
            >
              Track, organize and manage
              all your daily team tasks
              efficiently.
            </p>
          </div>

          <button
            onClick={() =>
              setShowModal(true)
            }
            style={{
              background:
                "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              border: "none",
              padding: "15px 24px",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow:
                "0 6px 18px rgba(37,99,235,0.35)",
              transition:
                "0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-3px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0px)";
            }}
          >
            <FaPlus />
            Create Task
          </button>
        </div>

        {/* TASK GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "28px",
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  background:
                    "white",
                  borderRadius:
                    "22px",
                  padding: "28px",
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.08)",
                  transition:
                    "0.35s ease",
                  border:
                    "1px solid #e5e7eb",
                  position:
                    "relative",
                  overflow:
                    "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(0,0,0,0.08)";
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius:
                      "18px",
                    background:
                      "#dbeafe",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    marginBottom:
                      "24px",
                  }}
                >
                  <FaClipboardList
                    size={32}
                    color="#2563eb"
                  />
                </div>

                {/* TITLE */}
                <h2
                  style={{
                    fontSize:
                      "28px",
                    color:
                      "#111827",
                    marginBottom:
                      "12px",
                    fontWeight:
                      "700",
                  }}
                >
                  {task.title}
                </h2>

                {/* DESCRIPTION */}
                <p
                  style={{
                    color:
                      "#6b7280",
                    lineHeight:
                      "1.8",
                    fontSize:
                      "16px",
                    minHeight:
                      "70px",
                  }}
                >
                  {task.description}
                </p>

                {/* FOOTER */}
                <div
                  style={{
                    marginTop:
                      "25px",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                  }}
                >
                  {/* STATUS */}
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "10px",

                      background:
                        task.status ===
                        "COMPLETED"
                          ? "#dcfce7"
                          : "#fef3c7",

                      color:
                        task.status ===
                        "COMPLETED"
                          ? "#166534"
                          : "#92400e",

                      padding:
                        "10px 18px",

                      borderRadius:
                        "40px",

                      fontWeight:
                        "700",

                      fontSize:
                        "14px",
                    }}
                  >
                    {task.status ===
                    "COMPLETED" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaClock />
                    )}

                    {task.status}
                  </div>

                  {/* DATE */}
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "8px",
                      color:
                        "#6b7280",
                      fontSize:
                        "14px",
                    }}
                  >
                    <FaRegCalendarAlt />

                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleString()
                      : "No Date"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                background:
                  "white",
                padding:
                  "70px 40px",
                borderRadius:
                  "24px",
                textAlign:
                  "center",
                color:
                  "#6b7280",
                width: "100%",
                gridColumn:
                  "1 / -1",
                boxShadow:
                  "0 4px 18px rgba(0,0,0,0.08)",
              }}
            >
              <FaTasks
                size={70}
                color="#2563eb"
              />

              <h2
                style={{
                  marginTop:
                    "25px",
                  fontSize:
                    "34px",
                  color:
                    "#111827",
                }}
              >
                No Tasks Found
              </h2>

              <p
                style={{
                  marginTop:
                    "12px",
                  fontSize:
                    "17px",
                }}
              >
                Create your first task
                to start managing your
                workflow.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex: 1000,
            backdropFilter:
              "blur(5px)",
          }}
        >
          <div
            style={{
              background:
                "white",
              padding: "30px",
              borderRadius:
                "24px",
              width: "430px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.25)",
            }}
          >
            <h2
              style={{
                marginBottom:
                  "24px",
                color:
                  "#111827",
                textAlign:
                  "center",
                fontSize:
                  "30px",
              }}
            >
              Create Task
            </h2>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Task Title"
              value={
                newTask.title
              }
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "14px",
                marginBottom:
                  "18px",
                borderRadius:
                  "12px",
                border:
                  "1px solid #d1d5db",
                outline:
                  "none",
                fontSize:
                  "15px",
                boxSizing:
                  "border-box",
              }}
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Task Description"
              value={
                newTask.description
              }
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "14px",
                height: "130px",
                borderRadius:
                  "12px",
                border:
                  "1px solid #d1d5db",
                outline:
                  "none",
                resize: "none",
                fontSize:
                  "15px",
                boxSizing:
                  "border-box",
              }}
            />

            {/* DUE DATE */}
            <input
              type="datetime-local"
              value={
                newTask.dueDate
              }
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  dueDate:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "14px",
                marginTop:
                  "15px",
                borderRadius:
                  "12px",
                border:
                  "1px solid #d1d5db",
                outline:
                  "none",
                fontSize:
                  "15px",
                boxSizing:
                  "border-box",
              }}
            />

            {/* ASSIGNED USER */}
            <input
              type="number"
              placeholder="Assign User ID"
              value={
                newTask.assignedTo
              }
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  assignedTo:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "14px",
                marginTop:
                  "15px",
                borderRadius:
                  "12px",
                border:
                  "1px solid #d1d5db",
                outline:
                  "none",
                fontSize:
                  "15px",
                boxSizing:
                  "border-box",
              }}
            />

            {/* PROJECT ID */}
            <input
              type="number"
              placeholder="Project ID"
              value={
                newTask.projectId
              }
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  projectId:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "14px",
                marginTop:
                  "15px",
                borderRadius:
                  "12px",
                border:
                  "1px solid #d1d5db",
                outline:
                  "none",
                fontSize:
                  "15px",
                boxSizing:
                  "border-box",
              }}
            />

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "14px",
                marginTop:
                  "25px",
              }}
            >
              <button
                onClick={() =>
                  setShowModal(false)
                }
                style={{
                  padding:
                    "12px 20px",
                  borderRadius:
                    "10px",
                  border: "none",
                  cursor:
                    "pointer",
                  background:
                    "#e5e7eb",
                  fontWeight:
                    "600",
                }}
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (
                    !newTask.title ||
                    !newTask.description ||
                    !newTask.dueDate ||
                    !newTask.assignedTo ||
                    !newTask.projectId
                  ) {
                    alert(
                      "Please fill all fields"
                    );
                    return;
                  }

                  try {
                    const payload = {
                      title:
                        newTask.title,

                      description:
                        newTask.description,

                      dueDate:
                        new Date(
                          newTask.dueDate
                        ),

                      assignedTo:
                        Number(
                          newTask.assignedTo
                        ),

                      projectId:
                        Number(
                          newTask.projectId
                        ),

                      status:
                        "PENDING",
                    };

                    const {
                      data,
                    } =
                      await API.post(
                        "/api/tasks",
                        payload
                      );

                    setTasks([
                      data,
                      ...tasks,
                    ]);

                    setShowModal(
                      false
                    );

                    setNewTask({
                      title: "",
                      description:
                        "",
                      dueDate: "",
                      assignedTo:
                        "",
                      projectId:
                        "",
                    });

                    alert(
                      "Task Created Successfully"
                    );
                  } catch (
                    error
                  ) {
                    console.log(
                      error
                    );

                    alert(
                      "Failed to create task"
                    );
                  }
                }}
                style={{
                  background:
                    "#2563eb",
                  color: "white",
                  padding:
                    "12px 22px",
                  borderRadius:
                    "10px",
                  border: "none",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",
                  boxShadow:
                    "0 4px 14px rgba(37,99,235,0.4)",
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;