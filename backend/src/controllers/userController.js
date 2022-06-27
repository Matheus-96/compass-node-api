import users from "../models/User.js";

class UserController {

    static createUser = (req, res) => {
        let user = new users(req.body);
        let validation = user.isValid()
        if (validation.ok) {
            user.save((err) => {
                if (err) {
                    res.status(500).send({ message: `${err.message} - Failed to create user.` })
                } else {
                    res.status(201).send(user.toJSON())
                }
            })
        } else {
            res.status(400).send({
                error: "Validation error",
                message: validation.errors
            })
        }
    }


    static updateUser = (req, res) => {
        const { id } = req.params;
        let user = new users(req.body);
        let validation = user.isValid();

        if (validation.ok) {
            users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
                if (!err) {
                    res.status(200).send({ message: `User (${id}) was successfully updated.` })
                } else {
                    res.status(404).send({ message: `User (${id}) was not found. ${err.message}` })
                }
            })
        } else {
            res.status(400).send({ error: `Validation Error.`, message: validation.errors })
        }
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

    static listUsers = (req, res) => {
        users.find((err, users) => {
            res.status(200).json(users)

        })
    }
    static listUserById = (req, res) => {
        const id = req.params.id;
        users.findById(id, (err, users) => {
            if (err) {
                res.status(404).send({ message: `${err.message}- user id not found! ` })
            } else {
                res.status(200).send(users);
            }

        }
        )
    }

}

export default UserController;



