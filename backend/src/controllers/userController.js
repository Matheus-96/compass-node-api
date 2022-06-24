import users from "../models/User.js";

class UserController {

    static createUser = (req, res) => {
        let user = new users(req.body);

        if (user.isValid()) {
            user.save((err) => {

                if (err) {
                    res.status(500).send({ message: `${err.message} - Failed to create user.` })
                } else {
                    res.status(201).send(user.toJSON())
                }
            })
        } else {
            res.status(400).send({ message: `Failed to create user. Validation Error.` })
        }
    }


    static updateUser = (req, res) => {
        const { id } = req.params;

        users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: `User (${id}) was successfully updated.` })
            } else {
                res.status(404).send({ message: `User (${id}) was not found. ${err.message}` })
            }
        })
    }

    static deleteUser = (req, res) => {
        const { id } = req.params;

        users.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: `User (${id}) was successfully deleted.` })
            } else {
                res.status(404).send({ message: `User (${id}) was not found or couldn't be deleted. ${err.message}` })
            }
        })
    }
}

export default UserController;