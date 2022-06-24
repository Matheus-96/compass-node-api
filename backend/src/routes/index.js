import express from "express";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.json({ title: "NodeJS backend API" })
    })

    app.use(
        express.json(),
    )
}

export default routes