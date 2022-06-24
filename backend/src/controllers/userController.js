import users from "../models/User.js";


class UserController {

    static listUsers = (req, res) =>{
        users.find((err, users) => {
            res.status(200).json(users)

    })
}
    static listUserById =(req,res) =>{
        const id = req.params.id;
        users.findById(id,(err,users)=>{
        if(err){
            res.status(404).send({message:`${err.message}- user id not found! `})
        }else{
            res.status(200).send(users);
        }

    }
    )
}

}

export default UserController;



