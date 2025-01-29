import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NewUpdate from '../../component/newUpdate/NewUpdate.jsx';
import SideSection from '../../component/sideSection/SideSection.jsx';
import { useSelector } from 'react-redux';
import SchemeSliders from '../home/SchemeSliders.jsx';

function EducationalInformation() {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { newPost } = useSelector(state=>state.post);
  const { isLight } = useSelector((state) => state.theme);
  const isNestedRoute = location.pathname.includes('/post/');

  return (
    <>
      <div className='flex w-full m-auto justify-start gap-[3rem] items-start md:p-[2rem] p-1 relative'>
        <section className='md:w-[70%] w-full'>
          {!isNestedRoute && <SideSection category="Education" setPage={setPage} page={page} />}
          <Outlet />
        </section>
        <div className="sticky w-[30%] hidden sm:block">
          <NewUpdate />
        </div>
      </div>
      <section
        className={`md:mt-[13%] mt-[7%] pb-10 border-t-[1px] py-10 flex flex-col gap-2 md:gap-6 justify-evenly w-[90%] m-auto  ${isLight ? "text-slate-800" : "text-slate-200"}`}
      >
        <div className='flex  items-center'>
          <span className='text-2xl md:text-3xl font-extrabold'>
            Trending News
          </span>
        </div>
        <div className='w-[100%] md:w-[90%] m-auto p-4'>
          <SchemeSliders link="/government-schemes" posts={newPost} />
        </div>
      </section>
    </>
  )
}

export default EducationalInformation