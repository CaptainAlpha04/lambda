'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import { signInWithPopup, GoogleAuthProvider, User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function Header() {

const [user, setUser] = useState<User | null>(null);
const router = useRouter();

useEffect(() => {
	const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
        setUser(user);
	}})

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user doesn't exist, add to Firestore
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
return (
    <>
        <nav className='navbar bg-base-300 p-2 items-center justify-between font-poppins text-base-content'>
            <Link href="/">
            <h1 className='font-pacifico text-3xl'>Schola</h1>
            </Link>
            <div className='flex gap-1'>
				{user && (
					<Link href="/dashboard" className='btn btn-ghost'>Dashboard</Link>
				)}
                <Link href="/" className='btn btn-ghost'>For Educators</Link>
                <Link href="/" className='btn btn-ghost'>For Students</Link>
                <Link href="/" className='btn btn-ghost'>Blog</Link>
                <div  className='tooltip tooltip-bottom' data-tip="Switch Theme">
                  <ThemeSwitch />
                </div>
				{user ? (
					<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
					  <div className="w-10 rounded-full">
						<img
						  alt="Tailwind CSS Navbar component"
						  src={user.photoURL ?? ''} />
					  </div>
					</div>
					<ul
					  tabIndex={0}
					  className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-fit p-2 shadow">
					  <div className='flex flex-col p-2'>
						<span className="font-bold">{user.displayName}</span>
						<span className='font-light text-xs'>{user.email}</span>
					  </div>
					  <li><a>Profile</a></li>
					  <li><a>Settings</a></li>
					  <li><a href="/" onClick={() => {
						auth.signOut()
					  }}>Logout</a></li>
					</ul>
					</div>
				) : (

					<button className='btn btn-primary'
					onClick={handleLogin}>Login</button>
				)}
            </div>
        </nav>
    </>
)
}

export default Header
