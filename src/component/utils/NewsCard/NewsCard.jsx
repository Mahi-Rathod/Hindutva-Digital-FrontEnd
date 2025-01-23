import React from 'react'
import { Link } from 'react-router-dom';
import { GrAnnounce } from "react-icons/gr";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineEvent } from "react-icons/md";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import aboutUs from '../../../assets/about-us.jpg';
function NewsCard({
    img = aboutUs,
    type = "Event",
    title = "Public Lecture : Creating a Liveble city",
    date = '1 July 2024',
    link
}) {
    return (
        <div
            // className='relative h-[25rem] md:h-[26rem] bg-white w-[100%] md:px-0 md:w-[20rem] rounded-lg shadow-md shadow-slate-400 cursor-pointer'
            className='relative h-[25rem] md:h-[26rem] bg-slate-900 w-[100%] md:px-0 md:w-[20rem] rounded-lg shadow-sm shadow-slate-800 cursor-pointer hover:shadow-[0px_0px_9px_0.8px_rgb(240,255,240,0.3)] hover:bg-slate-800'
        >

            <div className='w-full h-[11rem] md:h-[12rem] bg-cover bg-center rounded-t-lg' style={{ backgroundImage: `url(${img ? img : aboutUs})` }}>

            </div>
            <h2 className='w-full p-4'>
                {
                    type === 'Announcement' && <p className='flex items-center gap-2 font-mono font-semibold text-cyan-500'> <GrAnnounce /> {type} </p>
                }
                {
                    type === 'News' && <p className='flex items-center gap-2 font-mono font-semibold text-red-500'> <IoNewspaperOutline /> {type} </p>
                }
                {
                    type === 'Event' && <p className='flex items-center gap-2 font-mono font-semibold text-orange-500'> <MdOutlineEvent /> {type} </p>
                }
                {
                    type === 'Article' && <p className='flex items-center gap-2 font-mono font-semibold text-blue-600'> <GiBookshelf /> {type} </p>
                }

            </h2>
            <h2
            // className='w-full px-4 font-bold text-xl md:text-xl hover:text-cyan-700 ease-in-out duration-500'
            className='w-full px-4 font-semibold font-mono text-md md:text-xl ease-in-out duration-500 text-slate-300 line-clamp-2'
            >
                {title} 
            </h2>


            <p 
            className='px-4 absolute bottom-[2.9rem] text-[13px] text-cyan-400 font-semibold'
            >
                <Link
                to={`${link}`}
                // className='bg-white p-2 rounded-sm'
                className='bg-slate-900 p-2 rounded-sm'
                > पुढे वाचा » </Link></p>

            <div
            // className='w-full px-4 absolute bottom-0 h-[2.3rem] flex items-center justify-between border-t-[1px] text-slate-300'
            className='w-full px-4 absolute bottom-0 h-[2.3rem] flex items-center justify-between border-t-[1px] border-slate-500 text-slate-300'
            >
                <h1 
                className='font-mono font-semibold text-sm'
                >{date.slice(0, 10)}</h1>
                <div className='flex gap-1 text-lg'>
                    <FaInstagram className='hover:text-pink-600 cursor-pointer hover:-translate-y-1 transition-all ease-in-out duration-500' />
                    <FaWhatsapp className='hover:text-green-500 cursor-pointer hover:-translate-y-1 transition-all ease-in-out duration-500' />
                </div>
            </div>

        </div>
    )
}

export default NewsCard;