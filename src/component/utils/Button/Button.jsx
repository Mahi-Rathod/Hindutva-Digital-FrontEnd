import React from 'react';
import { NavLink } from 'react-router-dom';

function Button({
  btnText = 'Follow',
  bgBorder = 'border-solid border-none',
  btnLink = null,
  classNames='',
  bgColor = 'bg-slate-500',
  buttonIcon,
  ...props
}) {
  return (
    <NavLink to={btnLink} className='w-[6.5rem]'>
      <button
        className={
          `${bgColor}
          duration-500
          hover:-translate-y-2
          px-3 py-1
        text-white
          font-bold rounded-md
          flex items-center font-mono gap-2
          ${bgBorder} ${classNames}`
        }
        {...props}
      >
        {btnText}{buttonIcon}
      </button>
    </NavLink>
  );
}

export default Button;
