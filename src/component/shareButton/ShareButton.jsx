import { useEffect, useState } from "react";
import { FaCopy, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  EmailIcon,
  EmailShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import {
  createShareContent,
  updateShareMetaTags,
} from "../../utils/shareUtils";

const ShareButton = ({ title, url, post, onClose }) => {
  const { isLight } = useSelector((state) => state.theme);
  const [copySuccess, setCopySuccess] = useState(false);

  // Update meta tags dynamically for better sharing
  useEffect(() => {
    if (post && title && url) {
      updateShareMetaTags(post, url);
    }

    // Cleanup function to reset meta tags when component unmounts
    return () => {
      // Reset to default meta tags when component unmounts
      setTimeout(() => {
        if (document.title.includes(" - Hindutva Digital")) {
          document.title = "Hindutva Digital";
        }
      }, 1000);
    };
  }, [post, title, url]);

  // Extract first 150 characters from post content (remove HTML tags)
  const getPlainTextContent = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const text = div.textContent || div.innerText || "";
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  // Create share content using utility function
  const shareContent = createShareContent(post, url);
  console.log("Share Content:", shareContent);

  const postPreview = post ? getPlainTextContent(post.content) : "";
  const postImage = post?.thumbnail || "";
  const author = post?.author?.name || "Hindutva Digital";

  // Create share title and hashtags
  const shareTitle = title;
  const shareHashtags = ["HindutvaDigital", "News", "LatestUpdate"];

  const copyToClipboard = async () => {
    try {
      const textToCopy =
        shareContent.copy || shareContent.whatsapp || `${title}\n\n${url}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div
      className={`w-full max-w-sm mx-auto rounded-xl shadow-2xl border ${
        isLight ? "bg-white border-gray-200" : "bg-slate-800 border-slate-600"
      }`}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      {/* Header */}
      <div
        className={`p-4 sm:p-6 border-b flex justify-between items-start ${
          isLight ? "border-gray-200" : "border-slate-600"
        }`}
      >
        <div className="flex-1 min-w-0 pr-3">
          <h3
            className={`font-semibold text-lg sm:text-xl ${
              isLight ? "text-gray-800" : "text-white"
            }`}
          >
            Share this post
          </h3>
          <p
            className={`text-sm mt-1 ${
              isLight ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Choose how you&apos;d like to share this article
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors flex-shrink-0 ${
              isLight
                ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                : "text-gray-400 hover:text-gray-200 hover:bg-slate-700"
            }`}
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>

      {/* Post Preview */}
      {post && (
        <div
          className={`p-4 sm:p-6 border-b ${
            isLight ? "border-gray-200" : "border-slate-600"
          }`}
        >
          <div className="flex gap-3">
            {postImage && (
              <img
                src={postImage}
                alt="Post thumbnail"
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4
                className={`font-medium text-sm sm:text-base leading-tight mb-1 ${
                  isLight ? "text-gray-800" : "text-white"
                }`}
              >
                {title}
              </h4>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {postPreview}
              </p>
              <p
                className={`text-xs mt-1 ${
                  isLight ? "text-gray-500" : "text-gray-400"
                }`}
              >
                By {author}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Share Options */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {/* WhatsApp */}
          <WhatsappShareButton
            url={url}
            title={shareContent.whatsapp || `${title} - ${url}`}
            separator=""
            className="w-full"
          >
            <div
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors duration-200 bg-green-50 hover:bg-green-100 text-green-600 shadow-sm hover:shadow-md`}
            >
              <WhatsappIcon size={32} round />
              <span className="text-xs font-medium">WhatsApp</span>
            </div>
          </WhatsappShareButton>

          {/* Twitter */}
          <TwitterShareButton
            url={url}
            title={shareContent.twitter || title}
            hashtags={shareHashtags}
            className="w-full"
          >
            <div
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors duration-200 bg-sky-50 hover:bg-sky-100 text-sky-600 shadow-sm hover:shadow-md`}
            >
              <TwitterIcon size={32} round />
              <span className="text-xs font-medium">Twitter</span>
            </div>
          </TwitterShareButton>

          {/* Telegram */}
          <TelegramShareButton
            url={url}
            title={shareContent.telegram || title}
            className="w-full"
          >
            <div
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors duration-200 bg-blue-50 hover:bg-blue-100 text-blue-500 shadow-sm hover:shadow-md`}
            >
              <TelegramIcon size={32} round />
              <span className="text-xs font-medium">Telegram</span>
            </div>
          </TelegramShareButton>

          {/* Email */}
          <EmailShareButton
            url={url}
            subject={`📰 ${shareTitle} - Hindutva Digital`}
            body={
              shareContent.email || `Check out this article: ${title}\n\n${url}`
            }
            className="w-full"
          >
            <div
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-colors duration-200 bg-red-50 hover:bg-red-100 text-red-600 shadow-sm hover:shadow-md`}
            >
              <EmailIcon size={32} round />
              <span className="text-xs font-medium">Email</span>
            </div>
          </EmailShareButton>
        </div>

        {/* Copy Link */}
        <div
          className={`mt-4 pt-4 border-t ${
            isLight ? "border-gray-200" : "border-slate-600"
          }`}
        >
          <button
            onClick={copyToClipboard}
            className={`w-full flex items-center justify-center gap-2 p-4 rounded-lg transition-colors duration-200 ${
              copySuccess
                ? "bg-green-50 text-green-600 border-green-200"
                : `${
                    isLight
                      ? "bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200"
                      : "bg-slate-700 hover:bg-slate-600 text-gray-300 border-slate-600"
                  }`
            } border shadow-sm hover:shadow-md`}
          >
            <FaCopy className="text-sm" />
            <span className="text-sm font-medium">
              {copySuccess ? "Copied!" : "Copy share text"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Disable prop-types validation for this component
/* eslint-disable react/prop-types */

export default ShareButton;
