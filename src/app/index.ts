import express from "express"
import type { Express } from "express"

export function createApplication(): Express {
    const app = express()

    // middleware
    app.use(express.json())


    //routes
    app.get('/', (req, res) => {
        return res.json({message: "Parth ka Server"})
    })

    return app
}