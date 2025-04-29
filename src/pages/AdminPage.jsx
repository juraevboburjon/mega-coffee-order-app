import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [adminInfo, setAdminInfo] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://json-server-data-udg3.onrender.com/admin"
      );
      const admins = await response.json();
      const admin = admins.find(
        (admin) =>
          admin.username === adminInfo.username &&
          admin.password === adminInfo.password
      );

      if (admin) {
        localStorage.setItem(
          "adminToken",
          JSON.stringify({
            id: admin.id,
            username: admin.username,
            isLoggedIn: true,
          })
        );

        navigate("/admin/orders");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const menuBtn = () => {
    navigate("/");
  };
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="flex flex-col justify-center gap-8 items-center">
        {error && (
          <div className="p-4 text-sm text-red-700 w-full text-center bg-red-100 rounded-md">
            {error}
          </div>
        )}
        <form
          onSubmit={hanldeSubmit}
          className="bg-white w-96 h-[70%] rounded-md flex flex-col"
        >
          <h1 className="text-center font-bold rounded-md text-2xl bg-amber-300 py-8 w-full">
            메가 커피 Admin
          </h1>
          <div className="p-6 flex flex-col gap-5 text-lg mt-10">
            <label htmlFor="username" className="flex">
              ID
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={adminInfo.username}
              onChange={handleChange}
              className="border-b-1 border-amber-300 w-full focus:outline-none"
            />
            <label htmlFor="password" className="flex">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={adminInfo.password}
              onChange={handleChange}
              className="border-b-1 border-amber-300 w-full focus:outline-none"
            />
            <div className="flex justify-around">
              <button
                className="mt-12 border-1 rounded-lg px-6 py-2 border-amber-300 cursor-pointer"
                onClick={menuBtn}
              >
                Menu
              </button>
              <button className="mt-12 rounded-lg px-6 py-2 bg-amber-300 cursor-pointer hover:bg-amber-400 transition-all ">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
