import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

function SearchBar({isLight}) {
    return (
        <div className={`${isLight ? "bg-slate-100" : "bg-slate-700"} flex flex-row gap-1 items-center rounded-md w-[70%]`}>
            <input
                type="text"
                className={`${isLight ? "bg-slate-100" : "bg-slate-700"} border-0 focus:outline-none p-1 px-2 rounded-md text-sm font-mono h-10 w-[90%]`}
                placeholder="Type to Search"
            />
            <IoSearchOutline className="text-xl font-bold" />
        </div>
    )
}

export default SearchBar