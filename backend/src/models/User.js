import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: Number, required: true },
    complement: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true }
}, {
    versionKey: false
})

userSchema.methods.isValid = function() {
    return validateCPF(this.cpf) &&
        validatePassword(this.password) &&
        validateEmail(this.email) &&
        validateAge(this.birthDate)
}

function validateCPF(cpf) {
    let cpfLength = cpf.replace(/\.|\-/g, '').length
    return /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?\.?[0-9]{2}/g.test(cpf) && cpfLength == 11
}

function validateEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
}

function validatePassword(password) {
    return password.length >= 6
}

function validateAge(birthDate) {
    let today = new Date()
    birthDate = new Date(birthDate)
    let age = today.getFullYear() - birthDate.getFullYear()
    if (today.getMonth() < birthDate.getMonth() ||
        today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        age--
    }
    return age >= 18
}

const users = mongoose.model("users", userSchema)

export default users;