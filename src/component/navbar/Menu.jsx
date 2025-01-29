import React, { useState } from 'react'
import ThemeChange from '../utils/ThemeChange/ThemeChange.jsx';
import { NavLink } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import Footer from "../footer/Footer.jsx"
import { useSelector } from 'react-redux';
function Menu({ isVisible, toggleMenu }) {
    const { isLight } = useSelector((state) => state.theme);
    const renderNavLink = (to, label) => {
        return (
            <span className={`${ isLight? "bg-slate-200" :"bg-slate-800"} w-full py-8 px-3`} onClick={toggleMenu}>
                <NavLink
                    to={to}
                    className={({ isActive }) => `${isActive ? "text-orange-500" : (isLight ? "text-slate-900" : "text-slate-200")} font-semibold text-[0.952rem]`}
                >
                    {label}
                </NavLink>
            </span>
        )
    }

    return (
        <section className='w-[60%] h-full'>
            <div className='flex justify-end items-center h-11 md:hidden gap-5'>
                <ThemeChange />
                {
                    !isVisible ? (
                        <FiMenu className="text-3xl" onClick={toggleMenu} />
                    ) : (
                        <GiCrossedSwords className='text-3xl' onClick={toggleMenu} />
                    )
                }
            </div>
            <div
                // className={`fixed z-10 right-0 top-20 border-solid bg-white border-l-[1px] border-black h-full w-full overflow-hidden transition-transform duration-300 ease-in transform ${isVisible ? '-translate-x-0' : 'translate-x-full'}`}
                className={`
                    fixed z-10 right-0 top-[3.7rem]
                    border-solid
                    ${isLight ? "bg-white" : "bg-gradient-to-r from-slate-900 bg-slate-800"}
                    h-[100] w-full sm:hidden
                    overflow-hidden transition-transform duration-300 ease-in transform
                    ${isVisible ? '-translate-x-0' : 'translate-x-full'}
                `}
            >


                <div className='relative h-[90%] overflow-scroll overflow-x-hidden scroll-m-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
                    <div className='flex w-full'>
                        <div className='flex flex-col items-start w-full font-sans text-md'>
                            {renderNavLink("/", "Home")}
                            {renderNavLink("/latest-news", "ताज्या बातम्या")}
                            {renderNavLink("/government-schemes", "सरकारी योजना")}
                            {renderNavLink("/job-and-bharati", "जॉब / भरती")}
                            {renderNavLink("/government-gr", "शासन निर्णय (GR)")}
                            {renderNavLink("/educational-information", "एज्युकेशन")}
                            {renderNavLink("/other-information", "माहिती")}
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </section>
    )
}

export default Menu