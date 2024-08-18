'use client'
import React, {useState, useEffect} from 'react'
import SideBar from '../components/SideBarExtended'
import {useRouter} from 'next/navigation'

async function createCourse() {
    const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    if (response.ok) {
        return response.json()
    }
    throw new Error('Network response was not ok.')
}

function Page() {
    const [subject, setSubject] = useState<String>('')
    const [class_, setClass] = useState<String>('')
    const [board, setBoard] = useState<String>('')
    const [books, setBooks] = useState<File>()

    const router = useRouter();

    const handleNewCourse = () => {
        (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()        
    }

    const handleNewCourseSubmit = () => {
        //router.push(`/courses/`)
        const courseData = `${board}_${class_}_${subject}`
        console.log(courseData)
    }

return (
    <section className='w-screen h-screen bg-base-100 text-base-content'>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col gap-2">
            <h3 className="font-bold text-xl">New Course</h3>
            <p className="py-6">Enter Course Details</p>

            <input type="text" placeholder="Course Subject" className="input input-bordered w-full" required onChange={(event) => setSubject(event.target.value)} />

            <select className="select select-bordered w-full" id="class" required onChange={(event) => setClass(event.target.value)}>   
                <option value="">Select a Class</option>
                <option value="IX">9th {`(IX)`}</option>
                <option value="X">10th {`(X)`}</option>
                <option value="XI">11th {`(XI)`}</option>
                <option value="XII">12th {`(XII)`}</option>
            </select>
        
            <select className="select select-bordered w-full" id="board" required onChange={(event) => setBoard(event.target.value)}>
                <option value="">Select a Board</option>
                <option value="FBISE">Federal Board</option>
                <option value="PBISE">Punjab Board</option>
                <option value="SBISE">Sindh Board</option>
                <option value="KPKBISE">KPK Board</option>
                <option value="BBISE">Balochistan Board</option>
                <option value="AJKBISE">AJK Board</option>
                <option value="GBISE">Gilgit Board</option>
                <option value="AKBISE">Agha Khan Board</option>
            </select>
            <div className='label'>
                <span className='label-text'>Upload Primary Course Material {`(Books, Articles)`}</span>
            </div>
            <input type="file" onChange={(event) => {
            if (event.target.files) {
                setBooks(event.target.files[0]);
            }
            }}
            className="file-input file-input-bordered w-full" 
            accept=".pdf"
            multiple={false} />
            <div className="modal-action flex">
            <form method="dialog">
                <button type="submit" onClick={handleNewCourseSubmit}
                className='btn btn-primary'>Submit</button>
                <button className="btn">Cancel</button>
            </form>
            </div>
        </div>
        </dialog>
        <SideBar currentPage='courses'/>
        <section className='pl-80 p-10 flex flex-col items-center font-poppins'>
            <div className='text-center'>
                <h1 className='text-4xl font-light'>Create <b className='font-bold'>Content</b></h1>
                <p className='text-wrap px-80 py-4'>Curate and Create Notes, Multiple Choice Questions, Quizzes, Mock Exams, Flash Cards. Reference additional Resources like books, guides, and Articles. </p>
            </div>
            <div className = 'grid grid-cols-3 grid-rows-3 gap-3'>
            <button 
                onClick={handleNewCourse}
                className = 'w-64 h-64 rounded-xl bg-base-200 hover:border-primary gap-4 flex flex-col items-center place-content-center hover:bg-base-300'>
                        <i className="fi fi-br-book-plus text-6xl"></i>
                        <h1 className = 'text-2xl'>Add New Course</h1>
                </button>
            </div>
        </section>
    </section>
)
}

export default Page
