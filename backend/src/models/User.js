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
    let errorArray = [
        validateName(this.name),
        validateCPF(this.cpf),
        validateAge(this.birthDate),
        validateEmail(this.email),
        validatePassword(this.password),
        validateAddress(this.address),
        validateNumber(this.number),
        validateComplement(this.complement),
        validateCountry(this.country),
        validateState(this.state),
        validateCity(this.city),
        validateZipCode(this.zipCode)
    ].filter(el => el != true)
    let validation = { ok: errorArray.length == 0, errors: errorArray }
    return validation
}


function validateName(name) {
    return name.length > 0 ? true : "name"
}

function validateAddress(address) {
    return address.length > 0 ? true : "address"
}

function validateNumber(number) {
    return number > 0 ? true : "number"
}

function validateComplement(complement) {
    return complement.length > 0 ? true : "complement"
}

function validateCountry(country) {
    return country.length > 0 ? true : "country"
}

function validateState(state) {
    return state.length > 0 ? true : "state"
}

function validateCity(city) {
    return city.length > 0 ? true : "city"
}

function validateZipCode(zipCode) {
    return zipCode.length > 0 ? true : "zipCode"
}

function validateCPF(cpf) {
    let cpfLength = cpf.replace(/\.|\-/g, '').length
    return /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?\.?[0-9]{2}/g.test(cpf) && cpfLength == 11 ? true : "cpf"
}

function validateEmail(email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ? true : "email"
}

function validatePassword(password) {
    return password.length >= 6 ? true : 'password'
}

function validateAge(birthDate) {
    let today = new Date()
    birthDate = new Date(birthDate)
    let age = today.getFullYear() - birthDate.getFullYear()
    if (today.getMonth() < birthDate.getMonth() ||
        today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        age--
    }
    return age >= 18 ? true : 'birthDate'
}

const users = mongoose.model("users", userSchema)

export default users;