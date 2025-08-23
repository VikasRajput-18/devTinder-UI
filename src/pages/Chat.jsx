import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {

    const user = useSelector(state => state.user)


    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    useEffect(() => {
        if (!user?._id) return
        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName: user.firstName, userId: user?._id, targetUserId });

        socket.on("messageReceived", ({ firstName, newMessage, userId }) => {
            let messagesList = [...messages]
            messagesList.push({ id: Date.now(), sender: userId === user?._id ? "me" : "them", text: newMessage, firstName })
            setMessages(messagesList)
        })

        return () => {
            socket.disconnect()
        }
    }, [user, targetUserId, messages])

    const handleSend = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName: user?.firstName, userId: user?._id, targetUserId, text: newMessage })
        setNewMessage("");
    };


    return (
        <div className="flex flex-col h-[80vh] bg-gray-900 rounded-md overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-blue-800 text-white font-semibold shadow">
                Chat
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div>
                            <p className={`text-neutral-400 ${msg.sender === "me" ? "text-end" : "text-start"
                                } mb-1`}>{msg.firstName}</p>
                            <div
                                className={`px-4 py-2 rounded-2xl max-w-xs shadow 
              ${msg.sender === "me"
                                        ? "bg-rose-600 text-white rounded-br-none"
                                        : "bg-green-600 text-white rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="p-4 bg-gray-800 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-white bg-gray-900"
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition cursor-pointer"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
