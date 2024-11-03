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

    const deleteNote = async () => {
        if (confirm('Are you sure you want to delete this note?')) { // Confirm before deletion
            try {
                const db = new PocketBase('http://127.0.0.1:8090');
                await db.collection('notes').delete(note.id); // Delete the note

                alert('Note deleted successfully!');
                router.push('/notes'); // Redirect to the notes page after deletion
            } catch (error) {
                console.error('Error deleting note:', error);
            }
        }
    };


    if (!note) return <div>Loading...</div>; // Loading state while fetching note

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <form onSubmit={updateNote} className="bg-white p-8 shadow-md rounded-lg transition-shadow duration-300 hover:shadow-xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Note</h1>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    placeholder="Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    placeholder="Content"
                    rows={5}
                ></textarea>
                <button type="submit" className="w-full p-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
                    Update Note
                </button>
            </form>
            <button onClick={deleteNote} className="mt-2 w-full p-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200">
                Delete Note
            </button>
        </div>
    );
    
    
}
