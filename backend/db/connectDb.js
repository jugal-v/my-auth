import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB Connected :)`)
    } catch (error){
        console.log("Error connecting to MongoDB :(",error?.message)
        process.exit(1) //1: failure, failure,  0: status code is success
    }
}