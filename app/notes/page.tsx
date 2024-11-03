import Link from 'next/link';
import PocketBase from 'pocketbase';
import CreateNote from './CreateNote';

export const dynamic = 'auto',
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto';


async function getNotes() {
    const db = new PocketBase('http://127.0.0.1:8090');

    // Access the 'notes' collection and fetch records
    const data = await db.collection('notes').getList(1, 30); // page=1, perPage=30

    return data?.items as any[];
}

export default async function NotesPage() {
    const notes = await getNotes();
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Notes</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />;
                })}
                <CreateNote />
            </div>
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
