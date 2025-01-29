import React, { useEffect, useRef } from 'react'
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { LuYoutube } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { IoTrendingUpOutline } from "react-icons/io5";
import Instagram from './../../assets/Social-Media/Instagram.png'
import Youtube from './../../assets/Social-Media/Youtube.png'
import xtweeter from './../../assets/Social-Media/x_Black.png';
import Whatsapp from './../../assets/Social-Media/Whatsapp.png'
import x_white from './../../assets/Social-Media/x.png'
import Button from '../../component/utils/Button/Button.jsx';
import SchemeSliders from './SchemeSliders';

import useGsap from '../../component/utils/hook/useGsap.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WifiLoader from '../../component/utils/wifiLoader/WifiLoader.jsx';
import { useSelector } from 'react-redux';
import TextAnimation from '../../component/utils/TextAnimation/TextAnimation.jsx';

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const timeline = gsap.timeline({});
    const { isLight } = useSelector((state) => state.theme);

    const { status, trendingPosts, newPost } = useSelector((state) => state.post);

    const sectionsRef = useRef([]);

    useGsap(() => {
        sectionsRef.current.forEach((section, index) => {
            timeline.from(
                section,
                {
                    opacity: 0,
                    y: 100,
                    duration: 1,
                    delay: index * 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: '+=300',
                        scrub: true,
                    },
                }
            );
        });

        timeline.from("#home-section", {
            opacity: 0,
            duration: 0.2
        })

        timeline.from("#slogan", {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            color: "black",
            ease: "power4.out",
        })

        timeline.from("#info", {
            x: 500,
            duration: 0.5,
            opacity: 0
        })

        timeline.from("#card-container", {
            opacity: 0
        })

        timeline.from(".social-card", {
            opacity: 0,
            duration: 0.5,
            y: 100,
            stagger: 0.3
        })
    }, [status]);

    return (
        <main className='m-auto w-full p-2'>
            <section
                id='home-section'
                className={`relative h-[18rem] md:h-[28rem] bg-gradient-to-r ${isLight ? "from-orange-600 bg-pink-800" : "from-slate-800 bg-slate-900"} shadow-[10px_10px_15px_rgb(30 41 59 / var(--tw-text-opacity, 1))]`}
            >
                <TextAnimation name="Hindutva Digital" />
                <p id='info' className='text-sm md:text-md md:font-bold md:text-center md:px-10 md:w-[80%] w-full px-6 font-semibold text-justify m-auto text-slate-200'>
                    नमस्कार! मी ऋषिकेश राठोड हिंदुत्व डिजिटलच्या ऑनलाइन माहिती मंचावर तुमचे स्वागत करतो.
                    येथे तुम्हाला सरकारी योजनांबद्दलची सर्व माहिती, रोजची नोकरी आणि भरती अपडेट्स, शेतकरी अपडेट्स, महत्त्वाचे GR (सरकारी निर्णय), शैक्षणिक माहिती आणि इतर अनेक गोष्टी मिळतील!
                </p>

                <div
                    id='card-container'
                    className={`hidden absolute left-[7%] top-[58%] right-[10%] w-[85%] p-[1rem] ${isLight ? "bg-white" : "bg-gradient-to-r from-slate-800 bg-slate-900 text-slate-200"} border-solid border-slate-400 border-[1px] rounded-xl md:flex justify-center items-center gap-4`}
                >
                    {[
                        {
                            buttonText: "Follow",
                            img: Instagram,
                            text: 'इंस्टाग्राम वर रोज तुम्हाला सरकारी अपडेट्स मिळतील',
                            link: 'https://www.instagram.com/_._swastikevents_._/',
                            icon: <FaInstagram />,
                        },
                        {
                            buttonText: "Join",
                            img: Whatsapp,
                            text: 'रोज सकाळच्या ताज्या बातम्या, सरकारी योजना, शेतकरी अपडेट्स, शैक्षणिक माहिती',
                            link: 'https://chat.whatsapp.com/CTVG17zJG6H0KF7HKdn4MA',
                            icon: <FaWhatsapp />,
                        },
                        {
                            buttonText: "Follow",
                            img: isLight ? xtweeter : x_white,
                            text: 'सरकारी योजना, शेतकरी अपडेट्स, महत्वाचे GR (शासन निर्णय), वेळोवेळी शैक्षणिक माहिती मिळेल',
                            link: '/',
                            icon: <BsTwitterX />,
                        },
                        {
                            buttonText: "Subscribe",
                            img: Youtube,
                            text: 'सर्व नवीन व्हिडिओ पाहण्यासाठी आमच्या यूट्यूब चॅनेलला सब्सक्राईब करा!',
                            link: '/',
                            icon: <LuYoutube />,
                        },
                    ].map(({ img, text, link, icon, buttonText }, index) => (
                        <div
                            key={index}
                            className="social-card w-[30%] flex flex-col h-[15rem] items-center justify-evenly gap-5"
                        >
                            <img src={img} alt="" className="h-[7.3rem] m-auto" />
                            <p className="w-[90%] font-semibold text-[0.8rem] text-center">{text}</p>
                            <Button
                                btnText={buttonText}
                                btnLink={link}
                                classNames='hover:bg-slate-700'
                                buttonIcon={icon}
                                bgColor={isLight ? 'bg-slate-900' : 'bg-slate-500'}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {
                status === 'loading' ? (
                    <div className="w-full flex justify-center items-center px-4 py-2 mt-[3rem]">
                        <WifiLoader />
                    </div>) : (
                    <>
                        <section
                            id='sarkari-yojna'
                            className={`md:mt-[13%] mt-[7%] pb-10 border-t-[1px] py-10 flex flex-col gap-2 md:gap-6 justify-evenly w-[90%] m-auto  ${isLight ? "text-slate-800" : "text-slate-200"}`}
                            ref={(el) => (sectionsRef.current[1] = el)}
                        >
                            <div className='flex  items-center'>
                                <span className='text-2xl md:text-3xl font-extrabold'>
                                    Trending News
                                </span>
                                <IoTrendingUpOutline />
                            </div>
                            <div className='w-[100%] md:w-[90%] m-auto p-4'>
                                <SchemeSliders link="/government-schemes" posts={newPost} />
                            </div>
                        </section>


                        <section
                            id='sarkari-yojna'
                            className={`md:mt-[0] mt-[7%] pb-10 border-t-[1px] py-10 flex flex-col gap-2 md:gap-6 justify-evenly w-[90%] m-auto  ${isLight ? "text-slate-800" : "text-slate-200"}`}
                            ref={(el) => (sectionsRef.current[1] = el)}
                        >
                            <div className='flex  items-center'>
                                <span className='text-2xl md:text-3xl font-extrabold'>
                                    सरकारी योजना
                                </span>
                                <IoTrendingUpOutline />
                            </div>
                            <div className='w-[100%] md:w-[90%] m-auto p-4'>
                                <SchemeSliders link="/government-schemes" posts={trendingPosts["Government-Schemes"]} />
                            </div>
                            <div className='md:px-[2rem] py-1'>
                                <Button btnText='More Post' btnLink="/government-schemes" classNames='hover:bg-slate-700' bgColor={isLight ? 'bg-slate-900' : 'bg-slate-500'} />
                            </div>
                        </section>

                        {
                            trendingPosts["Job-Bharati"]?.length > 2 &&
                            <section
                                className={`py-10 flex flex-col gap-6 border-t-[1px] justify-center w-[90%] m-auto text-slate-200 ${isLight ? "text-slate-800" : "text-slate-200"}`}
                                ref={(el) => (sectionsRef.current[2] = el)}>
                                <div className='flex  items-center'>
                                    <span className='flex items-center px-[2rem] gap-3 text-xl'>
                                        <span className='text-3xl font-extrabold' >जॉब / सरकारी भरती</span> <IoTrendingUpOutline />
                                    </span>
                                </div>
                                <div className='w-[100%] md:w-[90%] m-auto p-4'>
                                    <SchemeSliders link="/job-and-bharati" posts={trendingPosts["Job-Bharati"]} />
                                </div>
                                <div className='px-[2rem]'>
                                    <Button btnText='More Post' btnLink="/job-and-bharati" classNames='hover:bg-slate-700' bgColor={isLight ? 'bg-slate-900' : 'bg-slate-500'} />
                                </div>
                            </section>
                        }


                        {
                            trendingPosts["GR"]?.length > 2 &&
                            <section
                                className={`py-10 flex flex-col gap-6 border-t-[1px] justify-center w-[90%] m-auto text-slate-200 ${isLight ? "text-slate-800" : "text-slate-200"}`}
                                ref={(el) => (sectionsRef.current[3] = el)}
                            >
                                <div className='flex  items-center'>
                                    <span className='flex items-center px-[2rem] gap-3 text-xl'>
                                        <span className='text-3xl font-extrabold'>शासन निर्णय (GR)</span> <IoTrendingUpOutline />
                                    </span>
                                </div>
                                <div className='w-[100%] md:w-[90%] m-auto p-4'>
                                    <SchemeSliders link="/government-gr" posts={trendingPosts["GR"]} />
                                </div>
                                <div className='px-[2rem]'>
                                    <Button btnText='More Post' btnLink="/government-gr" classNames='hover:bg-slate-700' bgColor={isLight ? 'bg-slate-900' : 'bg-slate-500'} />
                                </div>
                            </section>
                        }
                    </>
                )
            }



        </main >
    )
}

export default Home;