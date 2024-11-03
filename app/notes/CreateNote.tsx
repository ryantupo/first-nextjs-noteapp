'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    const create = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload

        try {
            const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });

            if (!res.ok) throw new Error('Failed to create note');

            setTitle('');
            setContent('');
            alert('Note created successfully!');
            
            router.refresh();

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={create} className="w-full max-w-md p-6 bg-white shadow-md rounded">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Create Note</h1>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <textarea
                    cols={30}
                    rows={10}
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                ></textarea>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create
                </button>
            </form>
        </div>
    );
}
