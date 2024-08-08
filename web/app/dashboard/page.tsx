import React from 'react'
import SideBar from '../components/SideBar'

function Page() {
return (
    <>
    <section className='bg-base-100 w-screen h-screen'>
        <SideBar currentPage='home' />
    </section>
    </>
)
}

export default Page
