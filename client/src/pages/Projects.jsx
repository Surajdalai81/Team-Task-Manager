import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  FaProjectDiagram,
  FaPlus,
  FaUsers,
} from "react-icons/fa";

import toast from "react-hot-toast";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [newProject, setNewProject] =
    useState({
      title: "",
      description: "",
      status: "ACTIVE",
    });

  // LOAD PROJECTS
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await API.get(
          "/api/projects"
        );

        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadProjects();
  }, []);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const { data } = await API.get(
        "/api/projects"
      );

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE PROJECT
  const createProject = async () => {
    if (
      !newProject.title ||
      !newProject.description
    ) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await API.post("/api/projects", {
        title: newProject.title,
        description:
          newProject.description,
        status: newProject.status,
      });

      toast.success("Project Created");

      setShowModal(false);

      setNewProject({
        title: "",
        description: "",
        status: "ACTIVE",
      });

      fetchProjects();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to create project"
      );
    }
  };

  // UPDATE STATUS
  const updateProjectStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(`/api/projects/${id}`, {
        status,
      });

      setProjects((prev) =>
        prev.map((project) =>
          project.id === id
            ? { ...project, status }
            : project
        )
      );

      toast.success(
        "Project status updated"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to update status"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right,#f8fafc,#eef2ff)",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* HERO SECTION */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#1d4ed8)",
          borderRadius: "30px",
          padding: "45px",
          color: "white",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "40px",
          boxShadow:
            "0 20px 40px rgba(37,99,235,0.25)",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "800",
              marginBottom: "12px",
            }}
          >
            Projects Workspace
          </h1>

          <p
            style={{
              fontSize: "18px",
              opacity: 0.9,
            }}
          >
            Organize and manage all your
            projects professionally.
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "15px",
            }}
          >
            <div
              style={{
                background:
                  "rgba(255,255,255,0.15)",
                padding: "10px 18px",
                borderRadius: "14px",
                fontWeight: "600",
              }}
            >
              Total Projects:{" "}
              {projects.length}
            </div>

            <div
              style={{
                background:
                  "rgba(255,255,255,0.15)",
                padding: "10px 18px",
                borderRadius: "14px",
                fontWeight: "600",
              }}
            >
              Active Workspace
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            setShowModal(true)
          }
          style={{
            background: "white",
            color: "#2563eb",
            border: "none",
            padding: "16px 28px",
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.15)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px)";
          }}
        >
          <FaPlus />
          New Project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "30px",
        }}
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              style={{
                background:
                  "rgba(255,255,255,0.9)",
                borderRadius: "30px",
                padding: "30px",
                backdropFilter:
                  "blur(10px)",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
                transition: "0.35s",
                border:
                  "1px solid rgba(255,255,255,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.08)";
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <FaProjectDiagram
                  size={34}
                  color="#2563eb"
                />
              </div>

              {/* TITLE */}
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "15px",
                }}
              >
                {project.title}
              </h2>

              {/* DESCRIPTION */}
              <p
                style={{
                  color: "#6b7280",
                  lineHeight: "1.8",
                  minHeight: "80px",
                }}
              >
                {project.description}
              </p>

              {/* FOOTER */}
              <div
                style={{
                  marginTop: "25px",
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  <FaUsers />
                  Team Project
                </div>

                {/* STATUS DROPDOWN */}
                <select
                  value={project.status}
                  onChange={(e) =>
                    updateProjectStatus(
                      project.id,
                      e.target.value
                    )
                  }
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "none",
                    background:
                      project.status ===
                      "ACTIVE"
                        ? "#dcfce7"
                        : "#fee2e2",

                    color:
                      project.status ===
                      "ACTIVE"
                        ? "#166534"
                        : "#991b1b",

                    fontWeight: "700",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="ACTIVE">
                    ACTIVE
                  </option>

                  <option value="INACTIVE">
                    INACTIVE
                  </option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              background: "white",
              padding: "60px",
              borderRadius: "24px",
              textAlign: "center",
              gridColumn: "1/-1",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <FaProjectDiagram
              size={55}
              color="#9ca3af"
            />

            <h2
              style={{
                marginTop: "20px",
                color: "#374151",
              }}
            >
              No Projects Found
            </h2>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              background: "white",
              width: "430px",
              padding: "35px",
              borderRadius: "28px",
              boxShadow:
                "0 25px 50px rgba(0,0,0,0.25)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
                fontSize: "34px",
                color: "#111827",
              }}
            >
              Create Project
            </h2>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  title: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                border:
                  "1px solid #d1d5db",
                marginBottom: "18px",
                outline: "none",
                fontSize: "15px",
                background: "#f9fafb",
                boxSizing: "border-box",
              }}
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Project Description"
              value={
                newProject.description
              }
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                height: "120px",
                padding: "15px",
                borderRadius: "14px",
                border:
                  "1px solid #d1d5db",
                outline: "none",
                resize: "none",
                background: "#f9fafb",
                boxSizing: "border-box",
              }}
            />

            {/* STATUS */}
            <select
              value={newProject.status}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  status:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "18px",
                borderRadius: "14px",
                border:
                  "1px solid #d1d5db",
                background: "#f9fafb",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "15px",
                marginTop: "28px",
              }}
            >
              <button
                onClick={() =>
                  setShowModal(false)
                }
                style={{
                  padding: "12px 20px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#e5e7eb",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Cancel
              </button>

              <button
                onClick={createProject}
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "700",
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

export default Projects;