import {
  useState,
  useContext,
} from "react";

import API from "../api/axios";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";

import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const { setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // LOGIN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // UPDATE CONTEXT
      setUser(data.user);

      toast.success(
        "Login Successful"
      );

      navigate("/projects");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        background:
          "linear-gradient(to bottom right,#dbeafe,#eff6ff)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "28px",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: "800",
            color: "#111827",
            marginBottom: "10px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "35px",
          }}
        >
          Login to continue managing
          your projects
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
        >
          {/* EMAIL */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border:
                  "1px solid #d1d5db",
                outline: "none",
                fontSize: "15px",
                background:
                  "#f9fafb",
                boxSizing:
                  "border-box",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div
            style={{
              marginBottom: "28px",
            }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={
                formData.password
              }
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border:
                  "1px solid #d1d5db",
                outline: "none",
                fontSize: "15px",
                background:
                  "#f9fafb",
                boxSizing:
                  "border-box",
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow:
                "0 8px 20px rgba(37,99,235,0.3)",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;