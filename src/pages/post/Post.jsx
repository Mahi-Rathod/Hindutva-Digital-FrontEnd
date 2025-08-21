import { useEffect, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../component/loader/Loader.jsx";
import ShareButton from "../../component/shareButton/ShareButton.jsx";
import { viewPost } from "../../redux/slices/postSlice.js";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, newPost } = useSelector((state) => state.post);
  const [isLiked, setIsLiked] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareBoxOpen, setShareBoxOpen] = useState(false);
  const [isLikeBoxOpen, setisLikeBoxOpen] = useState(false);

  const { isLight } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(viewPost(id)).then(() => setLoading(false));
  }, [id, dispatch]);

  // Handle body scroll when modal opens/closes
  useEffect(() => {
    if (shareBoxOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalOverflowX = document.body.style.overflowX;

      document.body.style.overflow = "hidden";
      document.body.style.overflowX = originalOverflowX || "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.overflowX = originalOverflowX || "hidden";
      };
    }
  }, [shareBoxOpen]);

  if (loading) {
    return <Loader />;
  }
  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleLikeUnlike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentBox = () => {};

  const handleShareDialog = () => {
    setShareBoxOpen(!shareBoxOpen);
  };

  const handleLikeBox = () => {
    setisLikeBoxOpen(!isLikeBoxOpen);
  };

  const closeShareModal = () => {
    setShareBoxOpen(false);
  };

  return (
    <>
      <article
        className={`py-2 px-1 ${
          isLight ? "bg-white" : "bg-slate-800"
        } rounded-md shadow-md w-[100%]`}
      >
        <h1
          className={`text-2xl font-bold mb-4 flex justify-between ${
            isLight ? "text-black" : "text-slate-200"
          }`}
        >
          {post.title}

          <button
            onClick={handleShareDialog}
            className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
            aria-label="Share"
          >
            <FaShareAlt className="text-green-500 text-2xl group-hover:text-green-300 transition-colors" />
          </button>
        </h1>
        <p
          className={`${
            isLight ? "text-gray-600" : "text-gray-300"
          } mb-2 font-mono`}
        >
          By {post?.author?.name || "Mahesh Rathod"} | Last Updated:{" "}
          {post?.updatedAt?.slice(0, 10)}
        </p>
        <hr
          className={`mb-2 ${isLight ? "border-gray-600" : "border-slate-500"}`}
        />
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="Post Thumbnail"
            className="w-full object-cover mb-4 rounded-lg"
          />
        )}
        <div
          className={`post-content ${
            isLight ? "text-slate-900" : "text-slate-200"
          }`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <br />

        {/* New Floating Pills Action Bar */}
        <div className="flex items-center justify-center gap-4 mt-8 mb-4">
          {/* Main Actions Container */}
          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
              isLight
                ? "bg-white/90 border border-gray-200 hover:shadow-xl"
                : "bg-gray-800/90 border border-gray-700 hover:shadow-2xl"
            }`}
          >
            {/* Like Button */}
            <button
              onClick={handleLikeUnlike}
              className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              {isLiked ? (
                <FaHeart className="text-red-500 text-lg animate-pulse" />
              ) : (
                <FaRegHeart className="text-gray-400 text-lg group-hover:text-red-400 transition-colors" />
              )}
              <span
                className={`text-sm font-medium ${
                  isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {isLiked ? "42" : "41"}
              </span>
            </button>

            <div
              className={`w-px h-6 ${isLight ? "bg-gray-300" : "bg-gray-600"}`}
            />

            {/* Comment Button */}
            <button
              onClick={handleCommentBox}
              className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              aria-label="Comment"
            >
              <FaRegComment className="text-blue-500 text-lg group-hover:text-blue-600 transition-colors" />
              <span
                className={`text-sm font-medium ${
                  isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                12
              </span>
            </button>

            <div
              className={`w-px h-6 ${isLight ? "bg-gray-300" : "bg-gray-600"}`}
            />

            {/* Share Button */}
            <button
              onClick={handleShareDialog}
              className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              aria-label="Share"
            >
              <FaShareAlt className="text-green-500 text-lg group-hover:text-green-600 transition-colors" />
              <span
                className={`text-sm font-medium ${
                  isLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Share
              </span>
            </button>
          </div>

          {/* Bookmark Button (Separate) */}
          {/* <button
            onClick={handleBookmark}
            className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
              isBookmarked
                ? "bg-yellow-100 border border-yellow-300 text-yellow-600"
                : isLight
                ? "bg-white/90 border border-gray-200 text-gray-400 hover:text-yellow-500"
                : "bg-gray-800/90 border border-gray-700 text-gray-400 hover:text-yellow-400"
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            {isBookmarked ? (
              <FaBookmark className="text-lg" />
            ) : (
              <FaRegBookmark className="text-lg" />
            )}
          </button> */}
        </div>
      </article>

      {/* Share Modal */}
      {shareBoxOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={closeShareModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in zoom-in-95 duration-200 overflow-y-auto">
            <div className="w-full max-w-sm mx-auto">
              <ShareButton
                title={post.title}
                url={window.location.href}
                post={post}
                onClose={closeShareModal}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
