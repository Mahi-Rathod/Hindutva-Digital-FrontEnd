import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";

const RichTextEditor = ({ modalData, setModalData }) => {
  const [formData, setFormData] = useState(modalData.post);

  // Function to trigger external script loading for embeds
  const loadSocialMediaScripts = () => {
    // Load Twitter widget script
    const loadTwitterScript = () => {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    };

    // Load Instagram embed script
    const loadInstagramScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    };

    // Load Facebook embed script
    const loadFacebookScript = () => {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0";
      script.async = true;
      document.body.appendChild(script);
    };

    // Load YouTube embed script
    const loadYouTubeScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    };

    // Load all scripts
    loadTwitterScript();
    loadInstagramScript();
    loadFacebookScript();
    loadYouTubeScript();

    // Cleanup scripts when the component is unmounted or updated
    return () => {
      document.body.querySelectorAll("script[src]").forEach((script) => {
        document.body.removeChild(script);
      });
    };
  };

  useEffect(() => {
    loadSocialMediaScripts(); // Load all social media scripts when content changes
  }, [formData.content]);

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
