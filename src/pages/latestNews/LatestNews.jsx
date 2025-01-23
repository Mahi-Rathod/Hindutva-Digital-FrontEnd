import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import NewUpdate from '../../component/newUpdate/NewUpdate.jsx'
import SideSection from '../../component/sideSection/SideSection.jsx'
function LatestNews() {
  const location = useLocation();
  const isNestedRoute = location.pathname.includes('/post/');
  const [page, setPage] = useState(1);
  return (
    <div className='flex w-[95%] m-auto justify-start gap-[3rem] items-start p-[2rem] relative'>
      <section className='md:w-[67%] w-full '>
        {!isNestedRoute && <SideSection category="Latest-News" setPage={setPage} page={page} />}
        <Outlet />
      </section>
      <div className='fixed w-[30%] right-4'>
        <NewUpdate />
      </div>
    </div>
  )
}

export default LatestNews;

{/* <div className='w-full flex justify-evenly items-center p-3'>
      <section className='md:w-[60%]'>
        <SideSection title = 'ताज्या बातम्या' news = {arr} />
      </section>
      <NewUpdate />
    </div> */}