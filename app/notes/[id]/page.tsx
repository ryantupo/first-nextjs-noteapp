import PocketBase from 'pocketbase';

async function getNoteById(noteId: string) {
    const db = new PocketBase('http://127.0.0.1:8090');
    const note = await db.collection('notes').getOne(noteId);
    return note;
}

export default async function NotePage({ params }: { params: { id: string } }) {
    // Fetch the note data
    const note = await getNoteById(params.id);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="p-6 bg-white shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{note.title}</h1>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{note.content}</p>
                <p className="text-gray-400 text-xs">{new Date(note.created).toLocaleDateString()}</p>
            </div>
        </div>
    );
}
