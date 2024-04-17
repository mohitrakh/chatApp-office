import React from 'react'
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

const Conversation = ({
    lastdx, conversation, emoji
}) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers?.includes(conversation._id)
    return (
        <>
            <div onClick={() => setSelectedConversation(conversation)} className={`flex items-center gap-2 hover:bg-sky-500 rounded p-2 py-1 $cursor-pointer ${selectedConversation?._id === conversation?._id ? "bg-sky-500" : ""} `}>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt="avatar" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>
            {
                !lastdx &&
                <div className='divider py-0 my-0 h-1'></div>
            }
        </>
    )
}

export default Conversation