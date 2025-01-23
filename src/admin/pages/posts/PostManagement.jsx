import React, { useState } from "react";
import AddPost from "./AddPost.jsx"
import { useSelector } from "react-redux";

const PostManagement = () => {
  const [addPostWindowVis, setAddPostWindowVis] = useState(false);

  const posts = useSelector((state) => state.dashboard.allPosts);
  const { isLight } = useSelector((state) => state.theme);

  const handleAddPostVisibility = () => {
    setAddPostWindowVis(addPostWindowVis => !addPostWindowVis);
  }

  return (
    <div className={`${isLight ? "bg-white" : "bg-slate-800 text-slate-200"} shadow-md p-4 mt-4 min-h-[90vh] w-full`}>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          className="border p-2 rounded w-1/3"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddPostVisibility}>New Post</button>
      </div>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full table-auto border-collapse border ${isLight ? "border-black" : "border-slate-500"
            }`}
        >
          <thead>
            <tr className={`${isLight ? "bg-white" : "bg-slate-600 text-slate-200"}`}>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Author</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className={`${isLight ? "hover:bg-gray-100" : "hover:bg-slate-700"
                  }`}
              >
                <td className="border p-2">{post.title}</td>
                <td className="border p-2">{post.name}</td>
                <td className="border p-2">{post.category}</td>
                <td
                  className={`border p-2 ${post.status === "Published"
                      ? "text-green-500"
                      : "text-yellow-500"
                    }`}
                >
                  {post.status}
                </td>
                <td className="border p-2">{post.date}</td>
                <td className="border p-2">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        addPostWindowVis &&
        <div className="w-full md:w-[80%] absolute z-10 top-10">
          <AddPost handleAddPostVisibility={handleAddPostVisibility} setAddPostWindowVis={setAddPostWindowVis} />
        </div>
      }

    </div>
  );
};

export default PostManagement;
