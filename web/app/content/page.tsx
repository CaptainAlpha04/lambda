import React from 'react'
import SideBar from '../components/SideBarExtended'

function Page() {
return (
    <section className='w-screen h-screen bg-base-100 text-base-content'>
        <SideBar currentPage='content'/>
        <section className='pl-80 p-10 flex flex-col items-center font-poppins'>
            <div className='text-center'>
                <h1 className='text-4xl font-light'>Create <b className='font-bold'>Content</b></h1>
                <p className='text-wrap px-80 py-4'>Curate and Create Notes, Multiple Choice Questions, Quizzes, Mock Exams, Flash Cards. Reference additional Resources like books, guides, and Articles. </p>
            </div>
            <div className = 'grid grid-cols-3 grid-rows-3 gap-3'>
                <div className = 'w-64 h-64 rounded-xl bg-base-200 hover:border-primary flex flex-col items-center place-content-center hover:bg-base-300'>
                        <i className="fi fi-br-book-alt text-6xl"></i>
                        <h1 className = 'text-2xl'>Notes</h1>
                </div>
            </div>
        </section>
    </section>
)
}

export default Page
