import users from "../models/User.js";

class UserController {

  
  
  
  static updateUser = (req, res) => {
    const {id} = req.params;

    users.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: `User (${id}) was successfully updated.`})
      } else {
        res.status(404).send({message: `User (${id}) was not found. ${err.message}`})
      }
    })
  }

  static deleteUser = (req, res) => {
    const {id} = req.params;

    users.findByIdAndDelete(id, (err) => {
      if(!err) {
        res.status(200).send({message: `User (${id}) was successfully deleted.`})
      } else {
        res.status(404).send({message: `User (${id}) was not found or couldn't be deleted. ${err.message}`})
      }
    })
  }
}

export default UserController;

