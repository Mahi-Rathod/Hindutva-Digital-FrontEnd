import React, { useState } from "react";
import ReactQuill from "react-quill";

const RichTextEditor = ({ modalData, setModalData }) => {
  const [formData, setFormData] = useState(modalData.post);

  const handleChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSave = () => {
    if (modalData.mode === "create") {
      console.log("New Post Created:", formData);
    } else if (modalData.mode === "edit") {
      console.log("Post Edited:", formData);
    }
    setModalData(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {modalData.mode === "create" ? "Create Post" : "Edit Post"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded w-full mb-4"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <ReactQuill
        value={formData.content}
        onChange={handleChange}
        className="mb-4"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded"
        onClick={() => setModalData(null)}
      >
        Cancel
      </button>
    </div>
  );
};

export default RichTextEditor;
