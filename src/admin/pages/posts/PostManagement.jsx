import { useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deletePost } from "../../../redux/slices/postSlice";
import AddPost from "./AddPost.jsx";

const PostManagement = () => {
  const dispatch = useDispatch();
  const [addPostWindowVis, setAddPostWindowVis] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(8);
  const [isDeleting, setIsDeleting] = useState(false);

  const allPosts = useSelector((state) => state.dashboard.allPosts);
  const { isLight } = useSelector((state) => state.theme);

  // Filter posts based on search term
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleAddPostVisibility = (post) => {
    setAddPostWindowVis((addPostWindowVis) => !addPostWindowVis);
    setPostToEdit(post);
    setConfirmDelete(null);
  };

  const handleDeleteConfirm = (postId) => {
    setConfirmDelete(postId);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const confirmDeletePost = (postId) => {
    setIsDeleting(true);
    dispatch(deletePost(postId))
      .unwrap()
      .then(() => {
        toast.success("Post deleted successfully");
        setConfirmDelete(null);
      })
      .catch((error) => {
        console.error("Failed to delete post:", error);
        toast.error("Failed to delete post. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className={`p-6 w-full h-full transition-all duration-300`}>
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
        <button
          className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md"
          onClick={() => handleAddPostVisibility(null)}
        >
          <FaPlus className="mr-2" /> New Post
        </button>
        <div className="w-full sm:w-1/2 flex justify-end">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearch}
            className={`w-full px-4 py-2 rounded-md border ${
              isLight
                ? "bg-white border-gray-300"
                : "bg-slate-700 border-slate-600 text-slate-200"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table
          className={`min-w-full table-auto border-collapse ${
            isLight ? "bg-white" : "bg-slate-700"
          }`}
        >
          <thead>
            <tr
              className={`${
                isLight ? "bg-gray-100" : "bg-slate-600 text-slate-200"
              } border-b ${isLight ? "border-gray-200" : "border-slate-500"}`}
            >
              <th className="px-6 py-4 text-left font-semibold">Title</th>
              <th className="px-6 py-4 text-left font-semibold">Author</th>
              <th className="px-6 py-4 text-left font-semibold">Category</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Date</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <tr
                  key={post.id}
                  className={`${
                    isLight
                      ? "border-b border-gray-200 hover:bg-gray-50"
                      : "border-b border-slate-600 hover:bg-slate-650"
                  } transition-colors duration-200`}
                >
                  <td
                    className={`px-6 py-4 max-w-xs truncate ${
                      isLight ? "" : " text-slate-200"
                    }`}
                  >
                    {post.title}
                  </td>
                  <td
                    className={`px-6 py-4 ${isLight ? "" : " text-slate-200"}`}
                  >
                    {post.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        post.category === "Latest-News"
                          ? "bg-blue-100 text-blue-800"
                          : post.category === "Government-Schemes"
                          ? "bg-purple-100 text-purple-800"
                          : post.category === "Job-Bharati"
                          ? "bg-yellow-100 text-yellow-800"
                          : post.category === "GR"
                          ? "bg-green-100 text-green-800"
                          : post.category === "Education"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 max-w-xs truncate ${
                      isLight ? "" : " text-slate-200"
                    }`}
                  >
                    {post.date}
                  </td>
                  <td className="px-6 py-4 flex justify-center space-x-3">
                    {confirmDelete === post.id ? (
                      <div className="flex items-center space-x-2">
                        {isDeleting ? (
                          <div className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center">
                            <div className="loader border-2 border-t-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin mr-2"></div>
                            Deleting...
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => confirmDeletePost(post.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={cancelDelete}
                              className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <button
                          className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                          onClick={() => handleAddPostVisibility(post)}
                          title="Edit Post"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                          onClick={() => handleDeleteConfirm(post.id)}
                          title="Delete Post"
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-gray-500 italic"
                >
                  {filteredPosts.length === 0 && searchTerm
                    ? `No posts found matching "${searchTerm}". Try a different search term.`
                    : 'No posts found. Create your first post by clicking "New Post" button.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <div
          className={`text-sm ${isLight ? "text-gray-600" : "text-slate-300"}`}
        >
          Showing {currentPosts.length > 0 ? indexOfFirstPost + 1 : 0} to{" "}
          {Math.min(indexOfLastPost, filteredPosts.length)} of{" "}
          {filteredPosts.length} posts
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : isLight
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-slate-600 text-slate-200 hover:bg-slate-500"
            } transition-colors`}
          >
            <FaAngleLeft />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? isLight
                    ? "bg-blue-600 text-white"
                    : "bg-blue-700 text-white"
                  : isLight
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-slate-600 text-slate-200 hover:bg-slate-500"
              } transition-colors`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : isLight
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-slate-600 text-slate-200 hover:bg-slate-500"
            } transition-colors`}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {addPostWindowVis && (
        <div className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
            onClick={() => handleAddPostVisibility(null)}
          ></div>
          <div
            className={`${
              isLight ? "bg-white" : "bg-slate-800 text-slate-200"
            } w-[95%] md:w-[90%] max-h-[90vh] overflow-auto shadow-2xl z-50 transition-all duration-300 transform`}
          >
            <AddPost
              handleAddPostVisibility={handleAddPostVisibility}
              isLight={isLight}
              setAddPostWindowVis={setAddPostWindowVis}
              postData={postToEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
