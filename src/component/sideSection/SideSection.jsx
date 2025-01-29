import React, { useEffect } from 'react'
import NewsCard from '../utils/NewsCard/NewsCard.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { fetchByCategory } from "../../redux/slices/postSlice.js";
import Button from '../utils/Button/Button.jsx';

function SideSection({ category, setPage, page }) {
    const dispatch = useDispatch();
    let link = "";

    switch (category) {
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

    const { postCategory } = useSelector(state => state.post);
    const posts = postCategory[category]?.posts || [];
    const totalPosts = postCategory[category]?.totalPosts || 0;
    const allPostsLoaded = posts.length >= totalPosts;

    const { isLight } = useSelector(state => state.theme);

    useEffect(() => {
        const existingPages = postCategory[category]?.pages || [];
        if (!existingPages.includes(page)) {
            dispatch(fetchByCategory({ category, page }));
        }
    }, [dispatch, category, page, posts]);

    const handlePageIncrement = () => {
        setPage(page + 1);
    };

    return (
        <>
            {
                posts?.length > 0 && (
                    <div className="w-full m-auto grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-[1rem] p-2">
                        {posts?.map((post) => (
                            <NewsCard
                                key={post.id}
                                img={post.thumbnail}
                                type={post.type}
                                title={post.title}
                                date={post.updatedAt}
                                link={`${link}/${post.id}`}
                                isLight={isLight}
                                heights = 'h-[15rem] md:h-[26rem]'
                            />
                        ))}
                    </div>
                )
            }
            {!allPostsLoaded && (
                <Button
                    btnText="Load More"
                    bgColor="bg-blue-500"
                    onClick={handlePageIncrement}
                />
            )}
        </>
    )
}

export default SideSection;