import tasks from "../models/Task.js";

class TaskController {

    static createTask = async(req, res) => {
        let task = new tasks(req.body);
        let validation = await task.isValid()
        if (validation.ok) {
            task.save((err) => {
                if (err) {
                    res.status(500).send({ message: `${err.message} - Failed to create task` })
                } else {
                    res.status(201).send(task.toJSON())
                }
            })
        } else {
            res.status(400).send({ error: 'Validation error', message: validation.errors })
        }
    }
}

export default TaskController;