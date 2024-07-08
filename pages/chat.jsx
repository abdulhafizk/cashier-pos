import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { nanoid } from 'nanoid'

export default function Chat() {
    const router = useRouter()
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        // Simulate fetching messages from a database or API
        const initialMessages = [
            {
                id: nanoid(),
                text: 'Selamat datang di chat kami!',
                from: 'admin',
            },
            {
                id: nanoid(),
                text: 'Bagaimana kami dapat membantu Anda hari ini?',
                from: 'admin',
            },
        ]
        setMessages(initialMessages)
    }, [])

    const handleSendMessage = (event) => {
        event.preventDefault()
        if (newMessage.trim() !== '') {
            const newMessages = [
                ...messages,
                { id: nanoid(), text: newMessage, from: 'user' },
            ]
            setMessages(newMessages)
            setNewMessage('')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-3/4 bg-white shadow rounded-lg p-4">
                <div className="flex flex-col">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`mb-2 ${
                                message.from === 'admin'
                                    ? 'text-right'
                                    : 'text-left'
                            }`}
                        >
                            <span
                                className={`bg-${
                                    message.from === 'admin'
                                        ? 'blue-500'
                                        : 'green-500'
                                }-500 text-white py-2 px-4 rounded-full inline-block`}
                            >
                                {message.text}
                            </span>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="mt-4">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        placeholder="Tulis pesan Anda..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="mt-2 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Kirim
                    </button>
                </form>
            </div>
        </div>
    )
}
