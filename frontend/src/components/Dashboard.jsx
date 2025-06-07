import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../lib/axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();

  const fetchUsers = async () => {
    const res = await axiosInstance.get("/users");
    console.log(res.data);
    setUsers(res.data);
  };

  const handleBlock = async (id) => {
    await axiosInstance.post(`/users/block/${id}`, null);
    fetchUsers();
  };
  const handleUnblock = async (id) => {
    await axiosInstance.post(`/users/unblock/${id}`, null);

    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider">
          Subscribed Users
        </h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border ">Username</th>
            <th className="p-2 border">City</th>
            <th className="p-2 border">Blocked</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center">
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.city}</td>
              <td className="p-2 border">{u.isBlocked ? "Yes" : "No"}</td>
              <td className="p-2 border sapce-x-2">
                {!u.isBlocked ? (
                  <button
                    className="bg-yellow-500 px-3 py-1 text-white rounded"
                    onClick={() => handleBlock(u._id)}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="bg-green-500 px-3 py-1 text-white rounded"
                    onClick={() => handleUnblock(u._id)}
                  >
                    Unblock
                  </button>
                )}
                <button
                  className="bg-red-600 px-3 py-1 text-white rounded"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
