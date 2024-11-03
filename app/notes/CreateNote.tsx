// CreateNote.tsx

import { useState } from 'react';
import PocketBase from 'pocketbase';

interface CreateNoteProps {
    isVisible: boolean;
    onClose: () => void;
    onNoteCreated: () => void;
}

export default function CreateNote({ isVisible, onClose, onNoteCreated }: CreateNoteProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const createNote = async (e) => {
        e.preventDefault();
        const db = new PocketBase('http://127.0.0.1:8090');

        await db.collection('notes').create({
            title,
            content,
        });

        // Clear input fields
        setTitle('');
        setContent('');

        // Call the onNoteCreated callback to refresh notes
        onNoteCreated();
        onClose(); // Call the onClose to hide the create note form
    };

    return (
        <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all ${isVisible ? 'block' : 'hidden'}`}>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Note</h2>
                <form onSubmit={createNote}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        required
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Content"
                        rows={5}
                        required
                    ></textarea>
                    <div>
                        <button 
                            type="submit" 
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            Create Note
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="w-full mt-2 p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
