import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookF, FaLink  } from "react-icons/fa";
import { useSelector } from "react-redux";

const ShareButton = ({ title, url }) => {
    const { isLight } = useSelector((state)=>state.theme)
  const shareOptions = [
    {
      platform: <IoLogoWhatsapp />,
      url: `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
      color : 'text-green-500'
    },
    {
      platform: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color : 'text-blue-500'
    },
    {
      platform: <FaLink />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      color : 'text-red-500'
    },
  ];

  return (
    <div className={`flex gap-5 text-xl  items-center p-5 absolute left-[18%] rounded-sm ${isLight ? 'border-slate-600' : 'border-slate-300'} border-[1px]`}>
      {shareOptions.map((option) => (
        <a
          key={option.platform}
          href={option.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${option.color}`}
        >
          {option.platform}
        </a>
      ))}
    </div>
  );
};

export default ShareButton;
