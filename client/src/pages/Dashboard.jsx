import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await API.get("/dashboard");

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  const cardStyle = {
    background: "white",
    borderRadius: "18px",
    padding: "35px 25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.3s ease",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "40px",
        width: "100%",
      }}
    >
      {/* MAIN WRAPPER */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              color: "#111827",
              marginBottom: "12px",
              fontWeight: "700",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Welcome to your Team Task Manager
          </p>
        </div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "30px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* TOTAL TASKS */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(0,0,0,0.08)";
            }}
          >
            <FaTasks size={50} color="#2563eb" />

            <h1
              style={{
                marginTop: "18px",
                fontSize: "42px",
                color: "#111827",
              }}
            >
              {stats.totalTasks || 0}
            </h1>

            <p
              style={{
                marginTop: "12px",
                color: "#6b7280",
                fontSize: "18px",
              }}
            >
              Total Tasks
            </p>
          </div>

          {/* COMPLETED */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(0,0,0,0.08)";
            }}
          >
            <FaCheckCircle size={50} color="#16a34a" />

            <h1
              style={{
                marginTop: "18px",
                fontSize: "42px",
                color: "#111827",
              }}
            >
              {stats.completedTasks || 0}
            </h1>

            <p
              style={{
                marginTop: "12px",
                color: "#6b7280",
                fontSize: "18px",
              }}
            >
              Completed Tasks
            </p>
          </div>

          {/* PENDING */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(0,0,0,0.08)";
            }}
          >
            <FaClock size={50} color="#f59e0b" />

            <h1
              style={{
                marginTop: "18px",
                fontSize: "42px",
                color: "#111827",
              }}
            >
              {stats.pendingTasks || 0}
            </h1>

            <p
              style={{
                marginTop: "12px",
                color: "#6b7280",
                fontSize: "18px",
              }}
            >
              Pending Tasks
            </p>
          </div>

          {/* OVERDUE */}
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(0,0,0,0.08)";
            }}
          >
            <FaExclamationTriangle size={50} color="#dc2626" />

            <h1
              style={{
                marginTop: "18px",
                fontSize: "42px",
                color: "#111827",
              }}
            >
              {stats.overdueTasks || 0}
            </h1>

            <p
              style={{
                marginTop: "12px",
                color: "#6b7280",
                fontSize: "18px",
              }}
            >
              Overdue Tasks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;