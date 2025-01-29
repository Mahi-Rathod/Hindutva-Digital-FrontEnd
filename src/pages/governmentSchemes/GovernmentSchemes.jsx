import React, { useState } from 'react'
import NewUpdate from '../../component/newUpdate/NewUpdate.jsx'
import SideSection from '../../component/sideSection/SideSection.jsx'
import { Outlet, useLocation } from 'react-router-dom';

function GovernmentSchemes() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const isNestedRoute = location.pathname.includes('/post/');

  return (
    <div className='flex w-w-full m-auto justify-start gap-[3rem] items-start p-[2rem] relative'>
      <section className='md:w-[65%] w-full'>
        {/* <h1 className='text-3xl font-bold font-mono p-2 bg-orange-500 mb-1 inline-block rounded-md text-white'>Government Schemes</h1> */}
        {!isNestedRoute && <SideSection category="Government-Schemes" setPage={setPage} page={page} />}
        <Outlet />
      </section>
      <div className="sticky w-[30%] hidden sm:block">
        <NewUpdate />
      </div>
    </div>
  )
}

export default GovernmentSchemes;