import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })
        connection.on("error", () => {
            console.log("Error connecting to MongoDB");
        })

    } catch (error) {
        console.log("Error Occured while connecting to MongoDB!!!", error);
    }
}