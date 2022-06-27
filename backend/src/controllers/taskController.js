import tasks from "../models/Task.js";

class TaskController {

    static createTask = async (req, res) => {
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

    static listTask = (req, res) => {
        tasks.find((err, tasks) => {
            res.status(200).json(tasks)

        })
    }
    static listTaskById = (req, res) => {
        const id = req.params.id;
        tasks.findById(id, (err, tasks) => {
            if (err) {
                res.status(404).send({ message: `${err.message}- task id not found! ` })
            } else {
                res.status(200).send(tasks);
            }
        }
        )
    }
    static updateTask = async (req, res) => {
        const { id } = req.params;
        let task = new tasks(req.body);
        let validation = await task.isValid();

        if (validation.ok) {
            tasks.findByIdAndUpdate(id, { $set: req.body }, (err) => {
                if (!err) {
                    res.status(200).send({ message: `Task (${id}) was successfully updated.` })
                } else {
                    res.status(404).send({ message: `Task (${id}) was not found. ${err.message}` })
                }
            })
        } else {
            res.status(400).send({ error: `Validation Error.`, message: `${validation.errors}` })
        }
    }

    static deleteTask = (req, res) => {
        const { id } = req.params;

        tasks.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: `Task (${id}) was successfully deleted.` })
            } else {
                res.status(404).send({ message: `Task (${id}) was not found or couldn't be deleted. ${err.message}` })
            }
        })
    }


}



export default TaskController;