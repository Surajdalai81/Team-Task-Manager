import { useState } from "react";

import API from "../api/axios";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/api/auth/register",
        formData
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="MEMBER">
            Member
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;