import { useState } from "react";
import Nav from "../layout/Nav";
import { setAccessToken } from "../../helper/authToken";
import { useNavigate } from "react-router";


const Register = ({ isCollapsed, menu, setUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed if backend sets refresh token in HTTP-only cookie
        body: JSON.stringify({ User: form }) // wrap all fields in "User" object
      });

      const data = await res.json();
      console.log("Registration response:", data);
      setUser(data.user);
      setAccessToken(data.accessToken);
      navigate("/app");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Nav menu={menu} isCollapsed={isCollapsed} />
      <div className="w-full flex-1 h-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
