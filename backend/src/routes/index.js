import express from "express";
import users from "./usersRoutes.js";

const routes = (app) => {
    app.route('/api/v1/').get((req, res) => {
        res.json({ title: "NodeJS backend API" })
    })

    app.use(
        express.json(),
        users
    )
}

export default routes