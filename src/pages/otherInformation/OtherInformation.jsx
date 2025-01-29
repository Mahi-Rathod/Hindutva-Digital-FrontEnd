import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import NewUpdate from '../../component/newUpdate/NewUpdate.jsx';
import SideSection from '../../component/sideSection/SideSection.jsx';
function OtherInformation() {
  const location = useLocation();
  const isNestedRoute = location.pathname.includes('/post/');
  const [page, setPage] = useState(1);

  return (
    <div className='flex w-full m-auto justify-start gap-[3rem] items-start p-[2rem] relative'>
      <section className='md:w-[67%] w-full '>
        {!isNestedRoute && <SideSection category="Information" setPage={setPage} page={page} />}
        <Outlet />
      </section>
      <div className="sticky w-[30%] hidden sm:block">
        <NewUpdate />
      </div>
    </div>
  )
}

export default OtherInformation;