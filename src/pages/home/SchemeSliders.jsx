import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from '../../component/utils/SliderArrows.jsx';
import NewsCard from "../../component/utils/NewsCard/NewsCard.jsx";

function SchemeSliders({ posts, link }) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 1800,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 1800,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    if (posts?.length > 0) {
        return (
            <div className='w-full px-4 md:px-6'>
                <Slider {...settings} className='flex justify-center'>
                    {posts.map((post, index) => (
                        <div className='p-4 md:p-5 flex justify-center items-center mx-auto' key={index}>
                            <NewsCard
                                img={post.thumbnail}
                                type={post.type}
                                title={post.title}
                                date={post.createdAt}
                                link={`${link}/post/${post.id}`}
                                heights='h-[17rem] md:h-[24rem]'
                                width='w-[80%] md:w-full'
                                imgHeight='h-[7.5rem] md:h-[12rem]'
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
    return null;
}

export default SchemeSliders;
