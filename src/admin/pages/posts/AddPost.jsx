import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";
import { IoMdCloudDone } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";
import JoditEditor from 'jodit-react';
import axiosInstance from "../../../component/utils/axiosInstance/AxiosInstance.jsx";
import { toast } from "react-toastify";
import Loader from "../../../component/loader/Loader.jsx";
import axios from "axios";

const AddPost = ({ handleAddPostVisibility, isLight }) => {
  const [uploading, setUploading] = useState({
    status: "Pending"
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState({
    fileName: '',
    fileType: '',
    S3Key: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (thumbnail.fileName && thumbnail.fileType && thumbnail.S3Key) data.thumbnailData = thumbnail;
      data.content = content;
      const res = await axiosInstance.post("/posts/add-post", data);
      console.log(res.data);
      toast.success('Blog Posted Successfully!');
      handleAddPostVisibility();
    } catch (err) {
      setIsLoading(false);
    }
  };


  const resetContent = () => {
    setContent("")
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setThumbnail({ ...thumbnail, fileName: e.target.files[0].name, fileType: e.target.files[0].type });
  }

  const handleThumbnailUpload = async () => {
    setUploading({ status: "Uploading" });
    try {
      if (!file) {
        throw new Error("Select File")
      }
      const { data } = await axiosInstance.post("/posts/add-post-thumbnail", { fileName: thumbnail.fileName, fileType: thumbnail.fileType });
      const { url, key } = data;

      if (key) {
        setThumbnail({ ...thumbnail, S3Key: key });
      }
      if (url) {
        const uploadToS3 = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type
          }
        });

        if (uploadToS3) {
          setUploading({ status: "Completed" });
        }
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
      setUploading({ status: "Pending" });
    }
  }

  return (
    <div className={`${isLight ? "bg-white" : "bg-slate-800 text-slate-200"} w-full mx-auto mt-10 p-6 rounded-lg shadow-lg`}>
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Section */}
        <div>
          <label htmlFor="title" className={`${isLight ? "bg-white  text-gray-700" : "bg-slate-800 text-slate-200"} block text-sm font-medium`}>
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            type="text"
            className={`${isLight ? "bg-white  text-gray-700" : "bg-slate-800 text-slate-200"} mt-1 block w-full h-10 p-2 rounded-md border-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter title"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {/* Category, Type, and Thumbnail Section */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-1/3">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="mt-1 block w-full h-10 p-2 rounded-md border-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select category</option>
              <option value="Latest-News">ताज्या बातम्या</option>
              <option value="Government-Schemes">सरकारी योजना</option>
              <option value="Job-Bharati">जॉब / भरती</option>
              <option value="GR">शासन निर्णय (GR)</option>
              <option value="Education">एज्युकेशन</option>
              <option value="Information">माहिती</option>
            </select>
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>

          <div className="w-full sm:w-1/4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              className="mt-1 block w-full h-10 p-2 rounded-md border-2 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select type</option>
              <option value="News">News</option>
              <option value="Announcement">Announcement</option>
              <option value="Event">Event</option>
            </select>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>

          <div className="w-full sm:w-1/3">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Thumbnail
            </label>
            <div className="flex items-center gap-2">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 h-10 p-2 border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              />
              {uploading.status === "Pending" && (
                <button
                  onClick={handleThumbnailUpload}
                  className="px-3 py-1 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none"
                >
                  <IoCloudUpload className="text-xl" />
                </button>
              )}
              {uploading.status === "Uploading" && (
                <div className="loader border-4 border-t-4 border-gray-300 border-t-green-500 rounded-full w-6 h-6 animate-spin"></div>
              )}
              {uploading.status === "Completed" && (
                <div className="text-green-500 font-semibold">
                  <IoMdCloudDone className="text-xl" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContent(newContent)}
            className="border-2 border-gray-300 rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        {
          !isLoading ? (
            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                className="flex-grow py-2 px-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:ring-2"
              >
                Submit
              </button>
              <button
                type="reset"
                className="flex-grow py-2 px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:ring-2"
                onClick={resetContent}
              >
                Reset
              </button>
              <button
                type="button"
                className="flex-grow py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:ring-2"
                onClick={handleAddPostVisibility}
              >
                Cancel
              </button>
            </div>
          ) : (
            <Loader />
          )
        }
      </form>
    </div>
  );
};

export default AddPost