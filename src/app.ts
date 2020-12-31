import bodyParser from "body-parser"
import compression from "compression"
import express from "express"
import { RecordRouter } from "./router"
import cors from "cors"

const app = express()

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(<any>cors())

app.use("/", RecordRouter)

export default app
