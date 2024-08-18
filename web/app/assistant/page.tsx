'use client'
import React,{useState, useEffect} from 'react'
import SideBar from '../components/SideBar'

function Page() {
const [toggleMessage, setToggleMessage] = useState<String | null>("Hide Sidebar")

const handleSideBarToggle = () => {
    const sidebar = document.querySelector('#sidebar')
    sidebar?.classList.toggle('hidden')
    setToggleMessage(sidebar?.classList.contains('hidden') ? 'Show Sidebar' : 'Hide Sidebar')
}

return (
    <section className='w-screen h-screen bg-base-100 font-poppins text-base-content'>
    {/*Primary Side Bar*/}
    <SideBar currentPage='assistant' />
    {/*Chat's Main Window*/}
    <section className='min-w-fit z-0 w-full absolute max-w-screen px-20 py-4 h-screen flex flex-col items-center'>
            <h1 className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-accent'>Alden</h1>
        <h2 className='text-sm font-light'>Your Personal Assistant</h2>
    </section>
    {/*Chat's History Side Bar*/}
    <div className='tooltip tooltip-left absolute right-2 z-10 top-2' data-tip={toggleMessage}>
    <button className='btn btn-ghost' onClick={handleSideBarToggle}>
            <i className='fi fi-rr-sidebar text-xl'></i>
    </button>
    </div>
    <div id="sidebar" className='w-1/4 h-full bg-base-200 absolute right-0 p-4 flex flex-col gap-6'>
        <div className='flex flex-row justify-between items-center'>
            <h1 className='text-2xl font-bold'>Chats</h1>
        </div>
        <button className='btn btn-outline'>
            New Chat +
        </button>
        <h2 className='text-lg font-semibold'>Previous Chats</h2>
        <div className='flex flex-col gap-3'>
        <button className='btn justify-between'>
                <h3>Chat 1</h3>
                <div className='flex flex-row gap-4 justify-end'>
                    <i className='fi fi-br-pencil cursor-pointer'></i>
                    <i className='fi fi-br-trash cursor-pointer'></i>
                </div>
        </button>
        </div>
    </div>
    </section>
)
}

export default Page
