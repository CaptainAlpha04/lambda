import React from 'react'
import SideBar from '../components/SideBarExtended'

function Page() {
return (
    <>
    <section className='bg-base-100 w-screen h-screen'>
        <SideBar currentPage='dashboard' />
    </section>
    </>
)
}

export default Page
