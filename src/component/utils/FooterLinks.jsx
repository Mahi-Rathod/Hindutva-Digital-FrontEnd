import React from 'react'
import { NavLink } from 'react-router-dom'

function FooterLinks({ categoryName, List }) {
    return (
        <section className='w-[50%]'>
            <h2 className='md:w-[90%] m-auto text-white text-left text-xl font-extrabold font-mono p-3'>{categoryName}</h2>
            <div className='flex flex-col justify-center gap-2 items-center'>
                {List.map((item, index) => (
                    <NavLink
                        to={item.link}
                        key={index}
                        className='w-[80%] hover:translate-x-5 text-sm text-left text-slate-400 duration-700 hover:text-white cursor-pointe font-semibold'
                    >
                        {item.title}
                    </NavLink>
                ))}
            </div>
        </section>
    )
}

export default FooterLinks 