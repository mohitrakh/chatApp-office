import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) =>{
    try {
        const {message} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;
       let conversation = await Conversation.findOne({
            participents: { $all: [senderId, recieverId] }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participents: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })


        if (newMessage) {
            console.log("inner newMessage")
            conversation.messages.push(newMessage._id);

        }

        await Promise.all([newMessage.save(), conversation.save()])

        const receiverSocketId = getReceiverSocketId(recieverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participents: {$all : [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([])
        }
        const messages = conversation.messages

        res.status(200).json(messages)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
}