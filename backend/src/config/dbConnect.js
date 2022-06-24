import mongoose from "mongoose"

mongoose.connect("mongodb+srv://matheus-96:123@cluster0.ttad1.mongodb.net/?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;