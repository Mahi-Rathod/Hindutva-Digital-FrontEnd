import React from 'react'
import aboutUs from '../../assets/about-us.jpg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NewUpdateCard({id, thumbnail, title, category }) {
  const { isLight } = useSelector((state)=>state.theme);
  let link = "";
  switch(category){
    case 'Government-Schemes':
      link = '/government-schemes/post'
      break;
    case 'Job-Bharati':
      link = '/job-and-bharati/post'
      break;
    case 'GR':
      link = '/government-gr/post'
      break;
    case 'Education':
      link = '/educational-information/post'
      break;
    case 'Information':
      link = '/other-information/post'
      break;
    case 'Latest-News':
      link = '/latest-news/post'
      break;
    default:
      link = "";
  }

  return (
    <Link to={`${link}/${id}`} >
      <div className={`w-full flex gap-5 justify-center items-center p-2 border-b-2 ${isLight ? "text-slate-900 hover:bg-slate-200" : "text-slate-200 hover:bg-slate-800 border-slate-800"}`}>
        <img src={thumbnail || aboutUs} alt="" className='h-[4.5rem]' />
        <h2 className='w-[60%] font-mono font-extrabold text-sm text-justify'>
          {title.slice(0, 50)}
        </h2>
      </div>
    </Link>
  );
}

export default NewUpdateCard;