import { BsSend } from "react-icons/bs";
import useConversation from "../../zustand/useConversation";
import { useState } from "react";

const MessageInput = () => {
    const { selectedConversation, messages, setMessages } = useConversation();
    const [message, setMessage] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message) {
            return
        }
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });
            const data = await res.json();
            console.log(data, "message")
            setMessages([...messages, data]);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className='px-4 my-3' onSubmit={sendMessage} >
            <div className='w-full relative'>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    <BsSend />
                </button>
            </div>
        </form>
    );
};
export default MessageInput;