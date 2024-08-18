import SideBar from '@/app/components/SideBar'
import React from 'react'

function Page() {
return (
    <section className='w-screen h-screen bg-base-100 text-base-content'>
        <SideBar currentPage='courses'/>
    </section>
)
}

export default Page
