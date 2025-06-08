import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../lib/axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { logout } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id) => {
    try {
      await axiosInstance.post(`/users/block/${id}`, null);
      fetchUsers();
    } catch {
      setError("Failed to block user.");
    }
  };
  const handleUnblock = async (id) => {
    try {
      await axiosInstance.post(`/users/unblock/${id}`, null);

      fetchUsers();
    } catch {
      setError("Failed to unblock user.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user ? ")) {
      try {
        await axiosInstance.delete(`/users/${id}`);
        fetchUsers();
      } catch {
        setError("Failed to delete user.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-xl bg-white shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Loading users..</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">
            Subscribed Users
          </h1>
          <button
            className="bg-red-500 text-white px-4 py-2  hover:bg-red-600 rounded-md font-medium transition"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        {error && (
          <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
        )}
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center border-collapse">
              <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-3 border ">Username</th>
                  <th className="p-3 border">City</th>
                  <th className="p-3 border">Blocked</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="bg-white hover:bg-gray-50 transition border-b"
                  >
                    <td className="p-3 border">{u.username}</td>
                    <td className="p-3 border">{u.city}</td>
                    <td className="p-3 border">{u.isBlocked ? "Yes" : "No"}</td>
                    <td className="p-3 border">
                      {!u.isBlocked ? (
                        <button
                          className="bg-yellow-500 px-3 py-1 text-white rounded mx-1 my-1 transition"
                          onClick={() => handleBlock(u._id)}
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 px-3 py-1 text-white rounded font-semibold transition"
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
