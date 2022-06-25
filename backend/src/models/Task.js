import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: { type: String },
    description: { type: String, required: true },
    date: { type: Date, min: Date.now(), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, {
    versionKey: false
})

const tasks = mongoose.model("tasks", taskSchema)

export default tasks;