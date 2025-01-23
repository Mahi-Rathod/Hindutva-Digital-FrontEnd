import React from 'react'
import { BsMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../../redux/slices/themeSlice';

function ThemeChange() {
    const dispatch = useDispatch();
    const { isLight } = useSelector((state)=>state.theme);
    console.log(isLight);

    const handleThemeChangeClick = () =>{
        dispatch(toggleTheme());
    }

    return (
        <div className='text-3xl cursor-pointer' onClick={handleThemeChangeClick}>
            {isLight ? <BsMoonStarsFill className='' /> : <FaSun />}
        </div>
    )
}

export default ThemeChange