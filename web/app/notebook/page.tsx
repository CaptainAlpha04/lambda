'use client'
import Editor from "../components/Editor";

export default function Home() {
    return (
        <div className="container mx-auto p-10 min-h-screen h-fit w-sreen">
        <h1 className="text-2xl font-bold mb-4">Notebook</h1>
        <Editor />
        </div>
    );
}
