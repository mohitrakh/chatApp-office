

import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";
import { useSocketContext } from "../../context/SocketContext";

const Messages = () => {
    const { selectedConversation, setMessages, messages } = useConversation()
    const { socket } = useSocketContext();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage])
        })

        return () => {
            socket?.off("newMessage")
        }
    }, [socket, setMessages, messages])
    const getMessages = async () => {
        try {
            const res = await fetch(`/api/messages/${selectedConversation._id}`);
            const data = await res.json();
            console.log(data)
            setMessages(data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getMessages()
    }, [selectedConversation])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                messages.length === 0 && (
                    <p className="text-center">Start the conversation</p>
                )
            }
            {
                messages.length > 0 && messages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            }
        </div>
    );
};
export default Messages;