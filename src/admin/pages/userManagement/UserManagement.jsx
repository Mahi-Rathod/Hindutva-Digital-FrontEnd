import React, { useState } from "react";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Alice Brown", email: "alice.brown@example.com", role: "Moderator", status: "Active" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full table-auto text-left bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(search.toLowerCase()) ||
                  user.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{index + 1 + (currentPage - 1) * usersPerPage}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
