import React from 'react'
import { IoKeypad, IoMail } from "react-icons/io5";
import { FaXTwitter, FaGooglePlusG, FaLinkedinIn, FaInstagram, FaPinterestP, FaFacebookF } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import FooterLinks from '../utils/FooterLinks';
import { useSelector } from "react-redux";

function Footer() {
  const { isLight } = useSelector((state) => state.theme);
  const currentYear = new Date(Date.now()).getFullYear()
  const categories = [
    { title: "Home", link: '/' },
    { title: "Latest News", link: '/latest-news' },
    { title: "Government Schemes", link: '/government-schemes' },
    { title: "Job and Bharati", link: '/job-and-bharati' },
    { title: "GR", link: '/government-gr' },
    { title: "Education", link: '/educational-information' },
    { title: "Information", link: '/other-information' },
    // { title: "More . . .", link: '/' },
  ]

  const usefulLinks = [
    { title: "About US", link: '/about-hindutva-digital' },
    // { title: "Featured Products", link: '/' },
    // { title: "Offers", link: '/' },
    // { title: "Blogs", link: '/' },
    // { title: "Faq", link: '/' },
    // { title: "Careers", link: '/' },
    { title: "Contact Us", link: '/contact-us' },
  ]

  const topCities = [
    { title: "Chh. Sambhajinagar", link: '/' },
    // { title: "Pune", link: '/' },
    // { title: "Nanded", link: '/' },
    // { title: "Jalna", link: '/' },
    // { title: "Haidrabad", link: '/' },
    // { title: "Bengluru", link: '/' },
    // { title: "Nashik", link: '/' },
  ]

  return (
    <footer className='flex flex-col py-3 bg-[#0b2852] mt-10 sticky'>
      <div
        className='flex md:flex-row flex-col px-4 md:px-0 w-full justify-center  items-center gap-1 md:gap-0'
      >
        <div className='w-full md:w-[50%] flex flex-col md:flex-row md:gap-3 md:justify-center md:items-center'>
          <h2 className='text-slate-400 font-mono flex gap-3 items-center'> <IoKeypad className='text-orange-500' /> +91 9699452046 </h2>
          <h2 className='text-slate-400 font-mono flex gap-3 items-center'> <IoMail className='text-orange-500' /> hindutvadigitalsetu@gmail.com </h2>
        </div>
        <div className='w-full md:w-[50%] flex gap-3 md:items-center md:justify-center py-4'>
          <span className='h-8 w-8 bg-[#51788c] flex items-center justify-center rounded-full text-slate-200 hover:-translate-y-2 duration-700 hover:bg-orange-500 cursor-pointer'><FaFacebookF /></span>
          <span className='h-8 w-8 bg-[#51788c] flex items-center justify-center rounded-full text-slate-200 hover:-translate-y-2 duration-700 hover:bg-orange-500 cursor-pointer'><FaXTwitter /></span>
          <span className='h-8 w-8 bg-[#51788c] flex items-center justify-center rounded-full text-slate-200 hover:-translate-y-2 duration-700 hover:bg-orange-500 cursor-pointer'><FaGooglePlusG /></span>
          <span className='h-8 w-8 bg-[#51788c] flex items-center justify-center rounded-full text-slate-200 hover:-translate-y-2 duration-700 hover:bg-orange-500 cursor-pointer'><FaLinkedinIn /></span>
          <span className='h-8 w-8 bg-[#51788c] flex items-center justify-center rounded-full text-slate-200 hover:-translate-y-2 duration-700 hover:bg-orange-500 cursor-pointer'><FaInstagram /></span>
          <span className='h-8 w-8 bg-[#51788c] flex items-center justify-center rounded-full text-slate-200 hover:-translate-y-2 duration-700 hover:bg-orange-500 cursor-pointer'><FaPinterestP /></span>
        </div>
      </div>


      <div className='flex w-full md:flex-row flex-col border-y-[1px] border-solid border-slate-500 md:px-16'>
        <div className='md:w-[50%] flex flex-row justify-between px-2 md:px-4'>
          <FooterLinks categoryName='Categories' List={categories} />
          <FooterLinks categoryName='Useful Links' List={usefulLinks} />
        </div>

        <div className='md:w-[70%] flex flex-row justify-between px-2 md:px-4'>
          {/* <FooterLinks categoryName='Top Cities' List={topCities} /> */}

          {/* <div className='w-[50%] text-white font-mono font-extrabold text-xl  flex flex-col justify-start items-start p-3 gap-6'>
            <div className='w-full flex flex-col gap-2'>
              <h1 className='text-left'>Download App</h1>
              <div className='w-full flex gap-3'>
                <div className='h-[1.7rem] w-[5rem] bg-contain bg-center border-solid border-slate-400 border-[1px] rounded-[4px]' style={{ backgroundImage: `url(${playstore})` }}></div>
                <div className='h-[1.7rem] w-[5rem] bg-contain bg-center border-solid border-slate-400 border-[1px] rounded-[4px]' style={{ backgroundImage: `url(${iosStore})` }}></div>
              </div>
            </div>
          </div> */}
          <div className="w-full mx-auto m-1">
            <div
              className={`overflow-hidden rounded-sm shadow-lg ${isLight ? "bg-gray-100" : "bg-slate-700"
                }`}
            >
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d38729.69688047066!2d75.480773!3d19.889937!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba5d53b367e2d%3A0xd7f095e2e7e3e967!2sAshatavinayak%20Society%20Phase%20-1%20Gangapur%20Jahagir%20431154!5e1!3m2!1sen!2sin!4v1738180643074!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-sm"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
      <div className='flex w-full md:flex-row flex-col md:px-16 justify-evenly '>
        <div className='flex flex-row gap-3 md:w-[70%] py-2 px-3 text-sm text-slate-400 md:px-12 items-center'>
          <span className='text-[0.8rem] font-semibold cursor-pointer hover:-translate-y-1 duration-500 hover:text-white'>About</span>
          <span className='text-[0.8rem] font-semibold cursor-pointer hover:-translate-y-1 duration-500 hover:text-white'>Contact</span>
          <span className='text-[0.8rem] font-semibold cursor-pointer hover:-translate-y-1 duration-500 hover:text-white'>Privacy Policy</span>
          <span className='text-[0.8rem] font-semibold cursor-pointer hover:-translate-y-1 duration-500 hover:text-white'>Terms & Conditions</span>
          <span className='text-[0.8rem] font-semibold cursor-pointer hover:-translate-y-1 duration-500 hover:text-white'>Refund & Return Policy</span>
        </div>
        <p className='text-[0.6rem] md:text-[0.71rem] p-3 text-slate-400 '>©Copyright {currentYear} <b> Hindutva Digital's</b>.  All Rights Reserved. </p>
      </div>
    </footer>
  )
}

export default Footer

{/*  */ }