import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

function SearchBar() {
    return (
        <div className="flex flex-row gap-1 items-center bg-slate-100 rounded-md w-[70%]">
            <input
                type="text"
                className="bg-slate-100 border-0 focus:outline-none p-1 px-2 rounded-md text-sm font-mono h-10 w-[90%]"
                placeholder="Search Product"
            />
            <IoSearchOutline className="text-xl font-bold" />
        </div>
    )
}

export default SearchBar