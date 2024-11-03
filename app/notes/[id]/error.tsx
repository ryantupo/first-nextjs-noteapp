'use client';

export default function Error() {
    return (
        <div className="flex items-center justify-center h-screen bg-red-100">
            <h1 className="text-4xl font-bold text-red-600">Error</h1>
            <p className="text-gray-700 mt-2">Something went wrong. Please try again later.</p>
        </div>
    );
}
