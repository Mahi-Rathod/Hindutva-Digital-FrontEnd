import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart, FaRegComment, FaShareAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { viewPost } from "../../redux/slices/postSlice.js";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../component/loader/Loader.jsx";
import ShareButton from '../../component/shareButton/ShareButton.jsx';
import SchemeSliders from '../home/SchemeSliders.jsx';

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, newPost }= useSelector(state => state.post);
  const [isLiked, setIsLiked] = useState(true);
  const [shareBoxOpen, setShareBoxOpen] = useState(false);
  const [isLikeBoxOpen, setisLikeBoxOpen] = useState(false);

  const { isLight } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(viewPost(id)).then(() => setLoading(false));
  }, [id, dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleLikeUnlike = () => {

  }

  const handleCommentBox = () => {

  }

  const handleShareDialog = () => {
    setShareBoxOpen(!shareBoxOpen);
  }

  const handleLikeBox = () => {
    setisLikeBoxOpen(!isLikeBoxOpen);

  }

  return (
    <>
      <article className={`py-2 px-1 ${isLight ? "bg-white" : "bg-slate-800"} rounded-md shadow-md w-[100%]`}>
        <h1 className={`text-2xl font-bold mb-4 ${isLight ? "text-black" : "text-slate-200"}`}>{post.title}</h1>
        <p className={`${isLight ? "text-gray-600" : "text-gray-300"} mb-2 font-mono`}>
          By {post?.author?.name || "Mahesh Rathod"} | Last Updated: {post?.updatedAt?.slice(0, 10)}
        </p>
        <hr className={`mb-2 ${isLight ? "border-gray-600" : "border-slate-500"}`} />
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="Post Thumbnail"
            className="w-full object-cover mb-4 rounded-lg"
          />
        )}

        <div
          className={`post-content ${isLight ? "text-slate-900" : "text-slate-200"}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <br /><hr /> <br />
        <div className={`text-3xl flex gap-5 ${isLight ? 'text-black' : 'text-white'} items-center relative`}>
          <span className='cursor-pointer' onClick={handleLikeUnlike}>{isLiked ? <FaHeart className='text-pink-600 cursor-pointer' /> : <FaRegHeart />}</span>
          <span className='cursor-pointer' onClick={handleCommentBox}> <FaRegComment /> </span>
          <span className='cursor-pointer' onClick={handleShareDialog}> <FaShareAlt /> </span>
          {shareBoxOpen &&
            <ShareButton title="Check out this awesome post!" url={window.location.href} />}
        </div>
        {
          post.likeCount > 0 &&
          <div className={` ${isLight ? 'text-black' : 'text-white'} p-2 font-semibold cursor-pointer`} onClick={handleLikeBox}>
            {post.likeCount === 1 ? post.likeCount + ' like' : post.likeCount + likes}
            {
              isLikeBoxOpen &&
              <div className={`${isLight ? 'border-slate-600' : 'border-slate-300'} border-[1px] p-4`}>
                <h1>hii</h1>
              </div>
            }
          </div>
        }

      </article>
    </>
  );
};

export default Post;
