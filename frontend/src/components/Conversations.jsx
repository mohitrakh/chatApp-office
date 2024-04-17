import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { getRandomEmoji } from '../utils/emoji';

const Conversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    const getConversation = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getConversation();
    }, [])

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {
                conversations.map((conversation, i) => {
                    return <Conversation lastdx={i === conversations.length - 1} key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} />
                })
            }
        </div>
    )
}

export default Conversations