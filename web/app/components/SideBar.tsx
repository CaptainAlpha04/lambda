"use client";
import React, {useState, useEffect} from "react";
import {useRouter} from 'next/navigation';
import ThemeSwitch from "./ThemeSwitch";
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

function SideBar({ currentPage }: { currentPage: string }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
            router.push('/')
        } else {
            setUser(user);
        }
    })
    
        return () => unsubscribe();
      }, [router]);

    return (
        <section id="sideBar" className="w-auto flex flex-col left-0 fixed p-8 bg-base-300 h-full text-base-content justify-between">
        
    <div className="flex flex-col gap-2">

        <div className="flex flex-row gap-1 items-center">
            <h1 className='font-pacifico text-3xl'>Schola</h1>
            <h1 className='font-light text-3xl'>Dashboard</h1>
        </div>


        <div className="divider"></div>
            
                <div className="tooltip tooltip-right">
                    <button
                    
                    className={`btn flex flex-row w-full justify-start ${
                        currentPage === "home"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-home text-lg"></i>
                        <h1>Dashboard</h1>
                    </button>
                </div>

                <div className="tooltip tooltip-right">
                    <button
                    
                    className={`btn flex flex-row w-full justify-start ${
                        currentPage === "notes"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-journal-alt text-lg"></i>
                        <h1>Create Notes</h1>
                    </button>
                </div>

                <div className="tooltip tooltip-right">
                    <button
                    
                    className={`btn flex flex-row w-full justify-start ${
                        currentPage === "mcqs"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-quiz-alt text-lg"></i>
                        <h1>Create MCQs</h1>
                    </button>
                </div>

                <div className="tooltip tooltip-right">
                    <button
                    
                    className={`btn flex flex-row w-full justify-start ${
                        currentPage === "quiz"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-quiz text-lg"></i>
                        <h1>Create Quiz</h1>
                    </button>
                </div>

                <div className="tooltip tooltip-right">
                    <button
                    
                    className={`btn flex flex-row w-full justify-start ${
                        currentPage === "references-notes"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-book-open-cover text-lg"></i>
                        <h1>Reference Notes</h1>
                    </button>
                </div>

                <div className="divider"></div>

                <div className="tooltip tooltip-right">
                    <button
                    
                    className={`btn flex flex-row w-full justify-start ${
                        currentPage === "whiteboard"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-signature text-lg"></i>
                        <h1>Whiteboard</h1>
                    </button>
                </div>

                <div className="tooltip tooltip-right">
                    <button
                    
                    className={`btn flex flex-row w-full justify-start ${
                        currentPage === "simulation"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-physics text-lg"></i>
                        <h1>Simulation Ground</h1>
                    </button>
                </div>
                
            <div className="tooltip tooltip-right">
                        <button
                        
                        className={`btn flex flex-row w-full justify-start ${
                            currentPage === "assistant"
                                    ? " btn-primary"
                                    : " btn-ghost"
                                }`}
                                >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.6 151.61" className="fill-current w-6 h-6">
                                <g id="Layer_2" data-name="Layer 2">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                    <circle cx="107.74" cy="71.12" r="58.24" />
                                    <circle cx="39.75" cy="17.01" r="17.01" />
                                    <circle cx="29.35" cy="122.26" r="29.35" />
                                    <circle cx="167.29" cy="119.26" r="10.31" />
                                    </g>
                                </g>
                                </svg>
                            <h1>AI Assistant</h1>
                        </button>
                    </div>
            </div>
            <div className="divider"></div>
        <div className="bottom-0 p-2 flex flex-row gap-3 w-full justify-between">  
                    
            <div className="dropdown dropdown-top">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
					  <div className="w-10 rounded-full">
						<img
						  alt="User"
						  src={user?.photoURL ?? ''} />
					  </div>
					</div>
					<ul
					  tabIndex={0}
					  className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-40 p-2 shadow">
					  <li><a>Profile</a></li>
					  <li><a href="/" onClick={() => {
                          auth.signOut()
                        }}>Logout</a></li>
					</ul>
			</div>
                <ThemeSwitch />
        </div>

    </section>
);
}

export default SideBar;
