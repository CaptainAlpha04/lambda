'use client'
import React from 'react'
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const uploadBook = async () => {
    const fileInput = document.querySelector('#upload-book') as HTMLInputElement;
    if (!fileInput?.files?.length) return;

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('book', file);

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
    <section className='flex p-10 gap-2'>
      <label htmlFor="upload-book">Upload a book</label>
      <input type="file" id="upload-book" className='input file-input-md input-primary' accept=".pdf"/>
      <button className='btn btn-primary' onClick={uploadBook}>Upload</button>
      <button className="btn btn-secondary" onClick={() => router.push("/whiteboard")}>
        Go to Whiteboard
      </button>
    </section>
  );
}

export default Page;
