import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from '../../component/utils/SliderArrows.jsx'
import NewsCard from "../../component/utils/NewsCard/NewsCard.jsx"


function SchemeSliders({posts,  link }) {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: true,
                    autoplay: true,
                    autoplaySpeed: 1500,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    autoplay: true,
                    dots: true,
                },
            },
        ],
    };

    if (posts?.length > 0) {
        return (
            <div className='w-[100%]'>
                <Slider {...settings} >
                    {posts.map((post, index) => (
                        <div className='p-5 md:p-[20px]' key={index}>
                            <NewsCard
                                img={post.thumbnail}
                                type={post.type}
                                title={post.title}
                                date={post.createdAt}
                                link={`${link}/post/${post.id}`}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        )
    }
}

export default SchemeSliders