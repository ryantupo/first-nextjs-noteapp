"use client"; // Add this line

import Link from 'next/link';
import PocketBase from 'pocketbase';
import CreateNote from './CreateNote';
import { useState, useEffect } from 'react';

async function getNotes() {
    const db = new PocketBase('http://127.0.0.1:8090');
    const data = await db.collection('notes').getList(1, 30); // page=1, perPage=30
    return data?.items as any[];
}

export default function NotesPage() {
    const [notes, setNotes] = useState<any[]>([]);
    const [isCreateNoteVisible, setCreateNoteVisible] = useState(false);

    const toggleCreateNote = () => {
        setCreateNoteVisible(!isCreateNoteVisible);
    };

    const fetchNotes = async () => {
        const notesData = await getNotes();
        setNotes(notesData);
    };

    const handleNoteCreated = () => {
        fetchNotes(); // Re-fetch notes to update the list
        setCreateNoteVisible(false); // Optionally close the create note form
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8 relative">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Notes</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {notes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
            <button 
                onClick={toggleCreateNote} 
                className="fixed bottom-10 right-10 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition">
                +
            </button>
            <CreateNote isVisible={isCreateNoteVisible} onClose={() => setCreateNoteVisible(false)} onNoteCreated={handleNoteCreated} />
        </div>
    );
}


function Note({ note }: any) {
    const { id, title, content, created } = note || {};

    return (
        <Link href={`/notes/${id}`}>
            <div className="p-6 bg-white shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{content}</p>
                <p className="text-gray-400 text-xs">{new Date(created).toLocaleDateString()}</p>
            </div>
        </Link>
    );
}
