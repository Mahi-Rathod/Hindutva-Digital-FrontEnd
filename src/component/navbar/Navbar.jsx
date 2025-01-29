import React, { useState } from 'react';
import logo from "../../assets/logo.jpeg";
import { NavLink } from 'react-router-dom';
import Menu from './Menu';
import SearchBar from '../utils/SearchBar/SearchBar.jsx';
import ThemeChange from '../utils/ThemeChange/ThemeChange.jsx';
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine } from "react-icons/ri";
import adminProfile from "../../assets/adminprofile.png";


function Navbar() {
    const [isMenu, setIsMenu] = useState(false);
    const { isAdmin, name } = useSelector((state) => state.auth);
    const { isLight } = useSelector((state) => state.theme);
    const [activeLink, setActiveLink] = useState({
        category: 'Category',
        isVisible: false
    });
    const toggleMenu = () => {
        setIsMenu(!isMenu);
    };

    const renderNavLink = (to, label) => (
        <span className='p-3' onClick={() => handleCategory(label)}>
            <NavLink
                to={to}
                className={({ isActive }) => `${isActive ? "text-orange-500" : (isLight ? "text-slate-900" : "text-slate-200")} font-semibold text-[0.952rem]`}
            >
                {label}
            </NavLink>
        </span>
    );

    const handleCategory = (label) => {
        const category = label === "Home" ? "Category" : label;
        setActiveLink({ category, isVisible: false });
    }

    const handleCategoryVisibility = () => {
        setActiveLink({ ...activeLink, isVisible: !activeLink.isVisible });
    }
    return (
        <header
            className={`sticky m-auto max-w-[1488px] border-solid border-b-[1px] p-2 w-full flex md:justify-between items-center z-50 top-0
                ${isLight ? "bg-white border-gray-500 text-slate-900" : "bg-gradient-to-r from-slate-900 bg-slate-800 border-slate-700 text-white "}`}
        >

            <div className="h-11 flex flex-row gap-[4rem] items-center cursor-pointer w-[40%]">
                <div className="flex flex-row gap-2 items-center cursor-pointer">
                    {/* <img
                        src={logo}
                        alt="Logo"
                        className="h-10 shadow-sm shadow-red-400 p-1 rounded-sm"
                    /> */}
                    <NavLink to="/home">
                        <div className="p-1">
                            <h2 className="text-[1.4rem] font-extrabold"> हिंदुत्व </h2>
                            <h3 className="text-orange-500 text-[0.8rem] font-extrabold font-serif">
                                Digital's
                            </h3>
                        </div>
                    </NavLink>
                </div>
            </div>


            {
                !isAdmin ? (
                    <>
                        <Menu isVisible={isMenu} toggleMenu={toggleMenu} />

                        <div
                            className="relative hidden md:flex gap-[3rem] w-[80%] items-center px-10 font-sans text-md"
                        >
                            {renderNavLink("/", "Home")}

                            <div
                                className={`flex items-center gap-2 font-bold cursor-pointer
                                    ${(activeLink.category === 'Category') ? (isLight ? "text-slate-900" : 'text-slate-200') : 'text-orange-500'}
                                `}
                                onClick={handleCategoryVisibility}
                            >
                                {activeLink.category}
                                <RiArrowDropDownLine className='text-2xl font-bold' />
                            </div>

                            <div
                                className={`absolute top-12 left-[6.7rem] flex flex-col ${isLight ? "bg-white" : "bg-gradient-to-b from-slate-800 to-slate-900"}  ${!activeLink.isVisible ? 'h-0' : 'h-[18rem]'} overflow-hidden ease-in-out duration-500 `}
                            >
                                {renderNavLink("/latest-news", "ताज्या बातम्या")}
                                {renderNavLink("/government-schemes", "सरकारी योजना")}
                                {renderNavLink("/job-and-bharati", "जॉब / भरती")}
                                {renderNavLink("/government-gr", "शासन निर्णय (GR)")}
                                {renderNavLink("/educational-information", "एज्युकेशन")}
                                {renderNavLink("/other-information", "माहिती")}
                            </div>
                            {/* {renderNavLink("/about-hindutva-digital", "About")} */}
                            <NavLink
                                to="/about-hindutva-digital"
                                className={({ isActive }) => `${isActive ? "text-orange-500" : (isLight ? "text-slate-900" : "text-slate-200")} font-semibold text-[0.952rem]`}
                            >
                                About
                            </NavLink>
                        </div>
                        <div className='hidden md:flex w-full items-center justify-center'>
                            <div className='px-5'>
                                <ThemeChange />
                            </div>
                            <SearchBar isLight={isLight} />
                        </div>
                    </>
                ) :
                    (
                        <div className='w-full items-center justify-end flex'>
                            <div className='hidden md:flex w-[70%] items-center justify-center'>
                                <SearchBar isLight={isLight} />
                            </div>
                            <div className="flex items-center space-x-4">
                                <ThemeChange />
                                <button className="text-2xl">🔔</button>
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={adminProfile}
                                        alt="Admin Avatar"
                                        className="w-11 h-11 rounded-full"
                                    />
                                    <span>{name}</span>
                                </div>
                            </div>
                        </div>
                    )
            }
        </header >
    );
}

export default Navbar;



