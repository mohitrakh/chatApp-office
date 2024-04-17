import mongoose from "mongoose"

export const connectionToDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to database")
    } catch (error) {
        console.log("error while connecting to db", error.messages)
    }
}