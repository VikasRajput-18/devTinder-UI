import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { axiosInstance } from "../axios/interceptor";

const Chat = () => {
    const user = useSelector(state => state.user);
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const messagesEndRef = useRef(null); // 🔽 reference to bottom div

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchChatMessages = async () => {
        try {
            const response = await axiosInstance.get(`/chat/${targetUserId}`)
            if (response.status === 200) {
                let messageList = response?.data?.messages?.map((msg) => {
                    return {

                        isSender: msg.senderId?._id === targetUserId ? false : true,
                        firstName: msg.senderId?.firstName,
                        lastName: msg.senderId?.lastName,
                        photoUrl: msg.senderId?.photoUrl,
                        text: msg?.text,
                    }
                })
                setMessages(messageList)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchChatMessages()
    }, [])




    useEffect(() => {
        if (!user?._id) return
        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName: user.firstName, userId: user?._id, targetUserId });

        socket.on("messageReceived", ({ firstName, lastName, newMessage, userId }) => {
            let messagesList = [...messages]
            messagesList.push({ isSender: userId === targetUserId ? false : true, text: newMessage, firstName, lastName })
            setMessages(messagesList)
        })

        return () => {
            socket.disconnect()
        }
    }, [user, targetUserId, messages])

    const handleSend = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { firstName: user?.firstName, lastName: user?.lastName, userId: user?._id, targetUserId, text: newMessage })
        setNewMessage("");
    };


    return (
        <div className="flex flex-col h-[80vh] mx-auto bg-gray-900 max-w-4xl rounded-md overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-neutral-900 text-white font-semibold shadow">
                Chat
            </div>

            {/* Messages */}
            <div className="flex-1 chat-scroll overflow-y-auto p-4 space-y-3">
                {messages.map((msg, ind) => {

                    return <div
                        key={ind}
                        className={`flex ${msg?.isSender ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div>
                            <p className={`text-neutral-400 ${msg?.isSender ? "text-end" : "text-start"
                                } mb-1`}>{`${msg.firstName} ${msg.lastName}`}</p>
                            <div
                                className={`px-4 py-2 rounded-2xl max-w-xs shadow ${msg?.isSender ? "text-end" : "text-start"}
              ${msg?.isSender
                                        ? "bg-green-800 text-white rounded-br-none"
                                        : "bg-neutral-800 text-white rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>

                        </div>
                    </div>
                }

                )}
                {/* 🔽 dummy div to scroll into view */}
                <div ref={messagesEndRef} />
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
