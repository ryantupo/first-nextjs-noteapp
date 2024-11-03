"use client"; // Add this line

import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

async function getNoteById(noteId: string) {
    const db = new PocketBase('http://127.0.0.1:8090');
    const note = await db.collection('notes').getOne(noteId);
    return note;
}

export default function NotePage({ params }: { params: { id: string } }) {
    const [note, setNote] = useState<any>(null); // State to hold the note data
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Fetch the note data when the component mounts
        const fetchNote = async () => {
            const fetchedNote = await getNoteById(params.id);
            setNote(fetchedNote);
            setTitle(fetchedNote.title);
            setContent(fetchedNote.content);
        };

        fetchNote();
    }, [params.id]);

    const updateNote = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const db = new PocketBase('http://127.0.0.1:8090');
            await db.collection('notes').update(note.id, { title, content }); // Update the note

            alert('Note updated successfully!');
            router.push('/notes'); // Redirect to the notes page after updating
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    if (!note) return <div>Loading...</div>; // Loading state while fetching note

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={updateNote} className="p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Edit Note</h1>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    placeholder="Content"
                    rows={5}
                ></textarea>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Update Note
                </button>
            </form>
        </div>
    );
}
