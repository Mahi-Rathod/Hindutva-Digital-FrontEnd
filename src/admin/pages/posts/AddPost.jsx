import axios from "axios";
import JoditEditor from "jodit-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { FaHeading, FaRegTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import { IoMdCloudDone } from "react-icons/io";
import { IoAlbums, IoCloudUpload, IoDocumentText } from "react-icons/io5";
import { MdCategory, MdDescription, MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../../component/loader/Loader.jsx";
import axiosInstance from "../../../component/utils/axiosInstance/AxiosInstance.jsx";
import "./EditorStyles.css";

const AddPost = ({ handleAddPostVisibility, isLight, postData }) => {
  const [uploading, setUploading] = useState({
    status: "Pending",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: postData?.title || "",
      category: postData?.category || "",
      type: postData?.type || "",
    },
  });

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState({
    fileName: postData?.thumbnailData?.fileName || "",
    fileType: postData?.thumbnailData?.fileType || "",
    S3Key: postData?.thumbnailData?.S3Key || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const editor = useRef(null);
  const editorContainer = useRef(null);
  const [content, setContent] = useState(postData?.content || "");

  // Set content when postData changes (when editing)
  useEffect(() => {
    if (postData?.content && editor.current) {
      setContent(postData.content);
      // If the editor is already initialized, update its value
      if (editor.current.editor) {
        editor.current.editor.value = postData.content;
      }
    }
  }, [postData]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Get the most recent content from the editor
      const editorContent = editor.current ? editor.current.value : content;

      if (thumbnail.fileName && thumbnail.fileType && thumbnail.S3Key)
        data.thumbnailData = thumbnail;

      data.content = editorContent;

      if (postData && postData.id) {
        // Update existing post
        const res = await axiosInstance.patch(
          `/posts/edit-post/${postData.id}`,
          data
        );
        console.log(res.data);
        toast.success("Blog Updated Successfully!");
      } else {
        // Create new post
        const res = await axiosInstance.post("/posts/add-post", data);
        console.log(res.data);
        toast.success("Blog Posted Successfully!");
      }

      handleAddPostVisibility();
    } catch (err) {
      console.error(
        postData ? "Error updating content:" : "Error posting content:",
        err
      );
      toast.error(
        postData
          ? "Failed to update content. Please try again."
          : "Failed to post content. Please try again."
      );
      setIsLoading(false);
    }
  };

  const resetContent = () => {
    setContent("");

    // Clear editor content if the editor instance is available
    if (editor.current && editor.current.editor) {
      editor.current.editor.value = "";
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setThumbnail({
      ...thumbnail,
      fileName: e.target.files[0].name,
      fileType: e.target.files[0].type,
    });
  };

  const handleThumbnailUpload = async () => {
    setUploading({ status: "Uploading" });
    try {
      if (!file) {
        throw new Error("Select File");
      }
      const { data } = await axiosInstance.post("/posts/add-post-thumbnail", {
        fileName: thumbnail.fileName,
        fileType: thumbnail.fileType,
      });
      const { url, key } = data;

      if (key) {
        setThumbnail({ ...thumbnail, S3Key: key });
      }
      if (url) {
        const uploadToS3 = await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
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
  };

  return (
    <div
      className={`${
        isLight ? "bg-white" : "bg-slate-800 text-slate-200"
      } w-full rounded-lg p-6 md:p-8`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
        <IoDocumentText
          className={`mr-3 ${isLight ? "text-blue-600" : "text-blue-400"}`}
          size={32}
        />
        {postData ? "Edit Post" : "Add New Post"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Section */}
        <div className="bg-opacity-50 p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
          <label
            htmlFor="title"
            className={`${
              isLight ? "text-gray-700" : "text-slate-200"
            } flex items-center text-sm font-medium mb-2`}
          >
            <FaHeading className="mr-2" /> Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            type="text"
            className={`${
              isLight
                ? "bg-white text-gray-700 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "bg-slate-700 text-slate-200 border-slate-600 focus:ring-blue-400 focus:border-blue-400"
            } mt-1 block w-full h-12 p-3 rounded-lg border shadow-sm transition-all duration-200`}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <span className="mr-1">•</span> {errors.title.message}
            </p>
          )}
        </div>

        {/* Category, Type, and Thumbnail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category */}
          <div className="bg-opacity-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <label
              htmlFor="category"
              className={`flex items-center text-sm font-medium mb-2 ${
                isLight ? "text-gray-700" : "text-slate-200"
              }`}
            >
              <MdCategory className="mr-2" /> Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={`mt-1 block w-full h-12 p-3 rounded-lg border ${
                isLight
                  ? "bg-white text-gray-700 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-slate-700 text-slate-200 border-slate-600 focus:ring-blue-400 focus:border-blue-400"
              } shadow-sm transition-all duration-200 appearance-none`}
            >
              <option value="">Select category</option>
              <option value="Latest-News">ताज्या बातम्या</option>
              <option value="Government-Schemes">सरकारी योजना</option>
              <option value="Job-Bharati">जॉब / भरती</option>
              <option value="GR">शासन निर्णय (GR)</option>
              <option value="Education">एज्युकेशन</option>
              <option value="Information">माहिती</option>
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="mr-1">•</span> {errors.category.message}
              </p>
            )}
          </div>

          {/* Type */}
          <div className="bg-opacity-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <label
              htmlFor="type"
              className={`flex items-center text-sm font-medium mb-2 ${
                isLight ? "text-gray-700" : "text-slate-200"
              }`}
            >
              <IoAlbums className="mr-2" /> Type
            </label>
            <select
              id="type"
              {...register("type", { required: "Type is required" })}
              className={`mt-1 block w-full h-12 p-3 rounded-lg border ${
                isLight
                  ? "bg-white text-gray-700 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  : "bg-slate-700 text-slate-200 border-slate-600 focus:ring-blue-400 focus:border-blue-400"
              } shadow-sm transition-all duration-200 appearance-none`}
            >
              <option value="">Select type</option>
              <option value="News">News</option>
              <option value="Announcement">Announcement</option>
              <option value="Event">Event</option>
            </select>
            {errors.type && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="mr-1">•</span> {errors.type.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="bg-opacity-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <label
              htmlFor="image"
              className={`flex items-center text-sm font-medium mb-2 ${
                isLight ? "text-gray-700" : "text-slate-200"
              }`}
            >
              <MdOutlineFileUpload className="mr-2" /> Thumbnail
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                className={`flex-1 relative w-full ${
                  thumbnail.fileName
                    ? "border border-green-300 rounded-lg p-1"
                    : ""
                }`}
              >
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`block w-full text-sm ${
                    isLight
                      ? "text-gray-700 bg-gray-50"
                      : "text-slate-200 bg-slate-700"
                  } h-12 p-3 border rounded-lg border-gray-300 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 ${
                    isLight
                      ? "file:bg-blue-50 file:text-blue-700"
                      : "file:bg-slate-600 file:text-slate-200"
                  } hover:file:bg-opacity-80 transition-colors`}
                />
                {thumbnail.fileName && (
                  <span
                    className={`text-xs ${
                      isLight ? "text-green-700" : "text-green-400"
                    } mt-1 block truncate`}
                  >
                    {thumbnail.fileName}
                  </span>
                )}
              </div>

              <div className="flex-shrink-0">
                {uploading.status === "Pending" && (
                  <button
                    type="button"
                    onClick={handleThumbnailUpload}
                    className="px-4 py-2 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none flex items-center justify-center transition-all duration-200 shadow-md"
                  >
                    <IoCloudUpload className="text-xl mr-1" /> Upload
                  </button>
                )}
                {uploading.status === "Uploading" && (
                  <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center">
                    <div className="loader border-4 border-t-4 border-gray-300 border-t-green-500 rounded-full w-5 h-5 animate-spin mr-2"></div>
                    <span>Uploading...</span>
                  </div>
                )}
                {uploading.status === "Completed" && (
                  <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg flex items-center justify-center">
                    <IoMdCloudDone className="text-xl mr-1" /> Uploaded
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-opacity-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <label
            className={`flex items-center text-sm font-medium mb-3 ${
              isLight ? "text-gray-700" : "text-slate-200"
            }`}
          >
            <MdDescription className="mr-2" /> Content
          </label>
          <div
            className={`${
              isLight ? "jodit-container-light" : "jodit-container-dark"
            }`}
            ref={editorContainer}
          >
            {/* Completely different approach to prevent focus loss */}
            <JoditEditor
              ref={editor}
              value={content}
              config={{
                readonly: false,
                height: 500,
                allowResizeX: false,
                allowResizeY: true,
                style: {
                  borderRadius: "0.5rem",
                },
                placeholder: "Start writing your post content...",
                buttons:
                  "bold,italic,underline,strikethrough,eraser,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,paragraph,|,image,table,link,|,align,undo,redo,\n,selectall,cut,copy,paste,|,hr,symbol,fullsize,print,preview,find, source",
                showPlaceholder: true,
                theme: isLight ? "light" : "dark",
                statusbar: false,
                autofocus: true,
                spellcheck: true,
                enableDragAndDropFileToEditor: true,
                uploader: {
                  insertImageAsBase64URI: true,
                },

                iframe: true,
                iframeStyle: isLight
                  ? ""
                  : `
                    html {
                      background-color: #1e293b;
                      color: #e2e8f0;
                    }
                    body {
                      background-color: #1e293b;
                      color: #e2e8f0;
                    }
                    .jodit-wysiwyg {
                      background-color: #1e293b;
                      color: #e2e8f0;
                    }
                    a {
                      color: #60a5fa;
                    }
                    table, th, td {
                      border-color: #475569;
                    }
                  `,
                colors: {
                  greyscale: isLight
                    ? [
                        "#000000",
                        "#434343",
                        "#666666",
                        "#999999",
                        "#B7B7B7",
                        "#CCCCCC",
                        "#D9D9D9",
                        "#EFEFEF",
                        "#F3F3F3",
                        "#FFFFFF",
                      ]
                    : [
                        "#FFFFFF",
                        "#F3F3F3",
                        "#EFEFEF",
                        "#D9D9D9",
                        "#CCCCCC",
                        "#B7B7B7",
                        "#999999",
                        "#666666",
                        "#434343",
                        "#000000",
                      ],
                  palette: [
                    "#FF6B6B", // Bright Red
                    "#FF9F43", // Orange
                    "#FFCE54", // Yellow
                    "#A0E77D", // Light Green
                    "#20C997", // Teal
                    "#48DBFB", // Light Blue
                    "#4A86E8", // Blue
                    "#9C88FF", // Purple
                    "#FF78C4", // Pink
                    "#FFA8A8", // Light Red
                  ],
                },
                controlTime: 200,
              }}
              onBlur={(newContent) => {
                if (newContent !== content) {
                  setContent(newContent);
                }
              }}
            />
          </div>
          {!content && (
            <p className="mt-2 text-yellow-500 flex items-center">
              <span className="mr-1">•</span> Content is required
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {!isLoading ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 ">
            <button
              type="submit"
              className={`flex-1 py-3 px-6 bg-gradient-to-r ${
                postData
                  ? "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500"
                  : "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500"
              } text-white rounded-lg shadow-md focus:ring-2 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center`}
            >
              <FaSave className="mr-2" />{" "}
              {postData ? "Update Post" : "Publish Post"}
            </button>
            <button
              type="reset"
              onClick={resetContent}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center"
            >
              <FaRegTrashAlt className="mr-2" /> Reset Content
            </button>
            <button
              type="button"
              onClick={handleAddPostVisibility}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center p-8">
            <Loader />
          </div>
        )}
      </form>
    </div>
  );
};

AddPost.propTypes = {
  handleAddPostVisibility: PropTypes.func.isRequired,
  setAddPostWindowVis: PropTypes.func,
  isLight: PropTypes.bool.isRequired,
  postData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    name: PropTypes.string,
    thumbnailData: PropTypes.shape({
      fileName: PropTypes.string,
      fileType: PropTypes.string,
      S3Key: PropTypes.string,
    }),
  }),
};

export default AddPost;
