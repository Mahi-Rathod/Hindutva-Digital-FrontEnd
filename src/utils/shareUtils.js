// Utility functions for sharing functionality

/**
 * Updates meta tags for better social media sharing
 * @param {Object} postData - The post data containing title, content, thumbnail, etc.
 * @param {string} url - The URL to share
 */
export const updateShareMetaTags = (postData, url) => {
  if (!postData) return;

  const updateMetaTag = (property, content) => {
    // Try property first, then name attribute
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.querySelector(`meta[name="${property}"]`);
    }
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("property", property);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // Extract plain text from HTML content
  const getPlainText = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const text = div.textContent || div.innerText || "";
    return text.length > 160 ? text.substring(0, 160) + "..." : text;
  };

  // Get full image URL
  const getFullImageUrl = (thumbnail) => {
    if (!thumbnail) return `${window.location.origin}/src/assets/logo.jpeg`;
    return thumbnail.startsWith("http")
      ? thumbnail
      : `${window.location.origin}${thumbnail}`;
  };

  const title = postData.title || "Hindutva Digital - Latest News";
  const description = getPlainText(
    postData.content || "Stay updated with the latest news and information."
  );
  const imageUrl = getFullImageUrl(postData.thumbnail);
  const author = postData.author?.name || "Hindutva Digital";

  // Update Open Graph meta tags
  updateMetaTag("og:title", title);
  updateMetaTag("og:description", description);
  updateMetaTag("og:image", imageUrl);
  updateMetaTag("og:url", url);
  updateMetaTag("og:type", "article");
  updateMetaTag("og:site_name", "Hindutva Digital");
  updateMetaTag("og:image:width", "1200");
  updateMetaTag("og:image:height", "630");

  // Update Twitter Card meta tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", title);
  updateMetaTag("twitter:description", description);
  updateMetaTag("twitter:image", imageUrl);
  updateMetaTag("twitter:site", "@HindutvaDigital");

  // Update general meta tags
  updateMetaTag("description", description);
  updateMetaTag("author", author);

  // Update page title
  document.title = `${title} - Hindutva Digital`;
};

/**
 * Creates formatted content for different social media platforms
 * @param {Object} postData - The post data
 * @param {string} url - The URL to share
 * @returns {Object} Formatted content for each platform
 */
export const createShareContent = (postData, url) => {
  if (!postData) return {};

  const getPlainText = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const text = div.textContent || div.innerText || "";
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  const title = postData.title || "Hindutva Digital Article";
  const preview = getPlainText(postData.content || "");
  const author = postData.author?.name || "Hindutva Digital";
  const date =
    postData.updatedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10);

  return {
    // WhatsApp - Emoji-rich format
    whatsapp: `📰 *${title}*\n\n${preview}\n\n👤 *Author:* ${author}\n📅 *Date:* ${date}\n\n🔗 Read full article: ${url}\n\n#HindutvaDigital #News #LatestUpdate`,

    // Twitter - Hashtag optimized (Twitter has character limit)
    twitter: `📰 ${title}\n\n${preview.substring(0, 100)}${
      preview.length > 100 ? "..." : ""
    }\n\n👤 By ${author}\n🔗 ${url}`,

    // Telegram - Clean format with markdown
    telegram: `📰 *${title}*\n\n${preview}\n\n👤 By: ${author}\n📅 ${date}\n\n🔗 [Read Full Article](${url})\n\n#HindutvaDigital`,

    // Email - Formal format
    email: `Dear Reader,\n\nI wanted to share this interesting article with you:\n\n"${title}"\n\n${preview}\n\nThis article was written by ${author} and published on ${date}.\n\nYou can read the complete article here: ${url}\n\nBest regards,\nShared via Hindutva Digital`,

    // Copy text - Rich format for clipboard
    copy: `📰 *${title}*\n\n${preview}\n\n👤 *Author:* ${author}\n📅 *Date:* ${date}\n\n🔗 Read full article: ${url}\n\n#HindutvaDigital #News #LatestUpdate`,
  };
};

/**
 * Reset meta tags to default values
 */
export const resetShareMetaTags = () => {
  const updateMetaTag = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.querySelector(`meta[name="${property}"]`);
    }
    if (element) {
      element.setAttribute("content", content);
    }
  };

  updateMetaTag("og:title", "Hindutva Digital - Latest News & Updates");
  updateMetaTag(
    "og:description",
    "Stay updated with the latest news, government schemes, educational information, and more from Hindutva Digital."
  );
  updateMetaTag("og:image", `${window.location.origin}/src/assets/logo.jpeg`);
  updateMetaTag("og:url", window.location.href);
  updateMetaTag("twitter:title", "Hindutva Digital - Latest News & Updates");
  updateMetaTag(
    "og:description",
    "Stay updated with the latest news, government schemes, educational information, and more from Hindutva Digital."
  );
  updateMetaTag(
    "twitter:description",
    "Stay updated with the latest news, government schemes, educational information, and more from Hindutva Digital."
  );
  updateMetaTag(
    "twitter:image",
    `${window.location.origin}/src/assets/logo.jpeg`
  );

  document.title = "Hindutva Digital";
};
