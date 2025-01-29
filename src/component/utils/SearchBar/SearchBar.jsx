import React, { useState, useRef, useEffect } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import NewUpdateCard from '../NewUpdateCard';
import { useSelector } from 'react-redux';



function searchTrendingPosts(trendingPosts, searchTerm) {
    const results = [];

    for (const category in trendingPosts) {
        if (trendingPosts.hasOwnProperty(category)) {
            const postsInCategory = trendingPosts[category];

            for (const post of postsInCategory) {
                // Assuming each 'post' is an object with properties like 'title', 'content', etc.
                // Adapt this to your actual post structure.
                const searchableText = `${post.title} ${category}`.toLowerCase(); // Combine relevant fields for search

                if (searchableText.includes(searchTerm.toLowerCase())) {
                    results.push({ ...post, category }); // Add the category to the result
                }
            }
        }
    }

    return results;
}

function SearchBar({ isLight }) {
    const { trendingPosts } = useSelector((state) => state.post);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        // Use both click and touchstart for better mobile support:
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick); // Add touchstart

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick); // Clean up both
        };
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const posts = searchTrendingPosts(trendingPosts, searchTerm);
        setFilteredPosts(posts);
        setShowResults(true);
    };


    return (
        <>
            <div className={`${isLight ? "bg-slate-100" : "bg-slate-700"} flex flex-row gap-1 items-center rounded-md w-[70%]`} ref={searchInputRef}> {/* Ref here */}
                <input
                    type="text"
                    className={`${isLight ? "bg-slate-100" : "bg-slate-700"} border-0 focus:outline-none p-1 px-2 rounded-md text-sm font-mono h-10 w-[90%]`}
                    placeholder="Type to Search"
                    onChange={handleSearch}
                    onClick={() => setShowResults(true)} // Keep this for clicks inside input
                />
                <IoSearchOutline className={`${isLight ? "text-slate-900" : "text-slate-100"} text-xl`} />
            </div>

            {showResults && filteredPosts?.length > 0 && searchTerm != 0 && ( // Use parentheses for better readability
                <div ref={searchInputRef}
                    className={`${isLight ? "bg-slate-100" : "bg-slate-700"} md:w-1/2 w-full absolute top-16 max-h-[70vh] overflow-y-auto`} // Combined styles
                >
                    {filteredPosts.map((post) => (
                        <NewUpdateCard
                            key={post.id}
                            id={post.id}
                            thumbnail={post.thumbnail}
                            title={post.title}
                            category={post.category}
                        />
                    ))}
                </div>
            )}
        </>

    )
}

export default SearchBar