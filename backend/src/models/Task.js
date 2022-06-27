import mongoose from "mongoose";
import users from "./User.js";

const taskSchema = new mongoose.Schema({
    id: { type: String },
    description: { type: String, required: true },
    date: { type: Date, min: Date.now(), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, {
    versionKey: false
})

taskSchema.methods.isValid = async function() {
    let errorArray = [
        await validateUser(this.user),
        validateDate(this.date),
        validateDescription(this.description)
    ].filter(el => el != true)

    let validation = { ok: errorArray.length == 0, errors: errorArray }
    return validation
}

async function validateUser(user) {
    console.log(user);
    return await users.findById(user) ? true : 'user'
}

async function validateDescription(description) {
    return description.length > 0 ? true : 'description'
}

function validateDate(date) {
    date = new Date(date)
    return date > Date.now() ? true : 'date'
}

const tasks = mongoose.model("tasks", taskSchema)

export default tasks;