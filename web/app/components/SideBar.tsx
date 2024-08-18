"use client";
import React, {useState, useEffect} from "react";
import {useRouter} from 'next/navigation';
import ThemeSwitch from "./ThemeSwitch";
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Link from 'next/link';

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
        <section id="sideBar" className="w-auto flex flex-col left-0 fixed p-1 bg-base-300 h-full text-base-content justify-between z-10">
        
    <div className="flex flex-col gap-2 items-center">

        <div>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className="fill-current h-14 w-14"
            width="494.000000pt" height="494.000000pt" viewBox="0 0 494.000000 494.000000"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,494.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M1110 3552 l0 -781 106 82 c59 45 115 89 125 97 18 14 19 38 19 443
            1 235 3 427 6 427 15 0 322 -229 386 -288 l28 -25 -58 -35 c-44 -27 -148 -92
            -170 -108 -9 -6 122 -195 132 -191 7 3 52 28 101 56 112 64 237 113 385 150
            460 116 893 30 1360 -269 117 -75 337 -233 437 -315 l32 -26 1 781 c0 429 -2
            780 -5 780 -11 0 -629 -466 -893 -673 l-61 -47 -73 20 c-236 65 -555 66 -823
            1 l-80 -20 -185 141 c-210 160 -722 546 -751 567 -19 13 -19 -1 -19 -767z
            m2640 -12 c0 -159 -2 -290 -4 -290 -2 0 -46 29 -97 64 -118 79 -295 186 -309
            186 -7 0 -10 4 -8 9 6 17 395 320 411 321 4 0 7 -130 7 -290z"/>
            <path d="M1491 2740 c-333 -46 -601 -281 -836 -732 -41 -80 -75 -147 -75 -150
            0 -3 62 -8 138 -12 295 -14 560 -89 819 -234 161 -89 292 -201 787 -671 l236
            -223 283 274 c422 411 490 471 648 575 269 176 635 283 967 283 l84 0 -55 104
            c-203 383 -407 610 -645 718 -155 70 -364 90 -526 48 -227 -58 -424 -240 -531
            -490 -70 -164 -146 -426 -201 -690 -9 -47 -20 -91 -24 -98 -3 -7 -12 18 -19
            55 -20 113 -89 380 -132 513 -117 363 -267 563 -503 670 -119 54 -284 78 -415
            60z m199 -260 c143 -23 277 -120 361 -261 94 -157 192 -472 264 -839 14 -74
            28 -144 32 -155 3 -11 -12 3 -34 32 -21 29 -75 92 -118 139 -306 336 -703 567
            -1107 644 -79 15 -115 26 -111 34 15 25 61 85 117 154 115 138 245 221 389
            247 91 17 126 17 207 5z m1998 -19 c98 -33 181 -89 277 -185 86 -86 174 -200
            163 -211 -2 -3 -58 -14 -123 -25 -128 -22 -310 -78 -427 -133 -264 -122 -566
            -377 -796 -672 -16 -20 -21 -23 -17 -10 4 11 20 84 35 161 68 335 146 595 233
            774 109 226 285 337 513 325 45 -2 108 -13 142 -24z"/>
            </g>
            </svg>
        </div>
            
                <div className="tooltip tooltip-right" data-tip="Dashboard">
                    <Link
                    href = '/dashboard'
                    className={`btn ${
                        currentPage === "dashboard"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-home text-lg"></i>
                    </Link>
                </div>

                <div className="tooltip tooltip-right" data-tip="Create Content">
                    <Link
                    href = "/courses"
                    className={`btn ${
                        currentPage === "courses"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-book-plus text-lg"></i>
                    </Link>
                </div>

                <div className="tooltip tooltip-right" data-tip="Whiteboard">
                    <Link
                    href = "/whiteboard"
                    className={`btn ${
                        currentPage === "whiteboard"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-signature text-lg"></i>
                    </Link>
                </div>

                <div className="tooltip tooltip-right" data-tip="Simulation Playground">
                    <Link
                    href = "/simulation"
                    className={`btn ${
                        currentPage === "simulation"
                        ? " btn-primary"
                        : " btn-ghost"
                    }`}
                    >
                        <i className="fi fi-br-physics text-lg"></i>
                    </Link>
                </div>
                
            <div className="tooltip tooltip-right" data-tip="AI Assistant">
                        <Link
                        href = "/assistant"
                        className={`btn ${
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
                        </Link>
                    </div>
            </div>

        <div className="bottom-0 p-2 flex flex-col gap-3 w-full justify-between">  
                    
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
					  <li><Link href="/profile">Profile</Link></li>
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
