'use client'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const uploadBook = async () => {
    const fileInput = document.querySelector('#upload-book') as HTMLInputElement;
    if (!fileInput?.files?.length) return;

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('book', file);
    formData.append('subject', subject);
    formData.append('grade', grade);

    try {
      const response = await fetch('http://localhost:5000/admin/content/generateNotes', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <section className='flex flex-col p-10 gap-4 max-w-md'>
      <label htmlFor="subject">Subject</label>
      <input
        type="text"
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="input input-bordered input-primary"
        placeholder="Enter subject"
      />

      <label htmlFor="grade">Grade</label>
      <input
        type="text"
        id="grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="input input-bordered input-primary"
        placeholder="Enter grade"
      />

      <label htmlFor="upload-book">Upload a book</label>
      <input type="file" id="upload-book" className='input file-input-md input-primary' accept=".pdf" />
      <button className='btn btn-primary' onClick={uploadBook}>Upload</button>
      <button className="btn btn-secondary" onClick={() => router.push("/whiteboard")}>
        Go to Whiteboard
      </button>
      <button className="btn btn-secondary" onClick={() => router.push("/chemlab")}>
        Go to Chemistry Lab
      </button>
      <a href="/notebook" className='btn btn-secondary'>Go to Notebook</a>
      <a href="/career" className='btn btn-secondary'>Go to Career Counselling</a>
    </section>
  );
}

export default Page;
