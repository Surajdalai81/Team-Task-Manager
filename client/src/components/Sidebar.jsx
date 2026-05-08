import {
  FaTasks,
  FaProjectDiagram,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ACTIVE MENU STYLE
  const menuStyle = (path) => ({
    padding: "16px 18px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background:
      location.pathname === path
        ? "linear-gradient(135deg,#2563eb,#3b82f6)"
        : "transparent",

    boxShadow:
      location.pathname === path
        ? "0 8px 20px rgba(37,99,235,0.35)"
        : "none",

    transform:
      location.pathname === path
        ? "translateX(4px)"
        : "translateX(0px)",
  });

  return (
    <div
      style={{
        width: "260px",
        background:
          "linear-gradient(180deg,#0f172a,#020617)",

        color: "white",

        padding: "25px 20px",

        position: "fixed",
        left: 0,
        top: 0,

        height: "100vh",

        display: "flex",
        flexDirection: "column",

        boxShadow:
          "6px 0 25px rgba(0,0,0,0.25)",

        zIndex: 100,
      }}
    >
      {/* TOP SECTION */}
      <div style={{ flex: 1 }}>
        {/* LOGO */}
        <div
          style={{
            marginBottom: "55px",
          }}
        >
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "10px",
              letterSpacing: "-1px",
              color: "#364e75",
            }}
          >
            Task Manager
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Team Workspace
          </p>
        </div>

        {/* MENU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* DASHBOARD */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <div style={menuStyle("/")}>
              <FaTachometerAlt size={18} />
              Dashboard
            </div>
          </Link>

          {/* PROJECTS */}
          <Link
            to="/projects"
            style={{
              textDecoration: "none",
            }}
          >
            <div style={menuStyle("/projects")}>
              <FaProjectDiagram size={18} />
              Projects
            </div>
          </Link>

          {/* TASKS */}
          <Link
            to="/tasks"
            style={{
              textDecoration: "none",
            }}
          >
            <div style={menuStyle("/tasks")}>
              <FaTasks size={18} />
              Tasks
            </div>
          </Link>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        style={{
          marginTop: "auto",
          width: "100%",
        }}
      >
        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",

            background:
              "linear-gradient(135deg,#dc2626,#ef4444)",

            color: "white",

            border: "none",

            padding: "15px",

            borderRadius: "14px",

            fontSize: "16px",

            fontWeight: "700",

            cursor: "pointer",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            gap: "10px",

            marginBottom: "22px",

            transition: "all 0.3s ease",

            boxShadow:
              "0 8px 20px rgba(220,38,38,0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-3px) scale(1.02)";

            e.currentTarget.style.boxShadow =
              "0 12px 24px rgba(220,38,38,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px) scale(1)";

            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(220,38,38,0.35)";
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>

        {/* FOOTER */}
        <div
          style={{
            borderTop:
              "1px solid rgba(255,255,255,0.08)",

            paddingTop: "18px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              textAlign: "center",
              margin: 0,
              letterSpacing: "0.5px",
            }}
          >
            Team Task Manager © 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;