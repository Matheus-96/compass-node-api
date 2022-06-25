import tasks from "../models/Task.js";

class TaskController {

    static createTask = async(req, res) => {
        let task = new tasks(req.body);

        if (await task.isValid()) {
            task.save((err) => {
                if (err) {
                    res.status(500).send({ message: `${err.message} - Failed to create task.` })
                } else {
                    res.status(201).send(task.toJSON())
                }
            })
        } else {
            res.status(400).send({ message: `Failed to create task. Validation Error.` })
        }
    }
}

export default TaskController;