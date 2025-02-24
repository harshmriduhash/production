import React from 'react'

export default function Loading() {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
                </div>
            </div>
        </div>
    )
}
