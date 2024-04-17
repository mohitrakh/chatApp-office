import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'


export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:8000/", {
                query: {
                    userId: authUser._id
                }
            })
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
                console.log(users, "user online")
            })
            setSocket(socket);

            return () => socket.close()
        } else {
            socket?.close();
            setSocket(null)
        }
    }, [authUser])

    return (
        <SocketContext.Provider value={{ onlineUsers, setOnlineUsers, socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;

export const useSocketContext = () => {
    return useContext(SocketContext)
}