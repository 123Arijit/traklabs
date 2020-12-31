import app from "./app"
import { connect, Mongoose } from "mongoose"
import dotenv from "dotenv"
import { Server } from "http"

dotenv.config()

let server: Server
let mongoose: Mongoose

connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((mongooseInstance) => {
    mongoose = mongooseInstance
    server = app.listen(process.env.PORT, () => {
        console.info(`Server started 🚀`)
    }).on("error", (err) => {
        console.error(err)
    }).on("close", () => {
        console.info(`Server shutdown ⛔`)
    })
}).catch((err) => {
    console.error(`Database connection error: ${err}`)
})

process.on("SIGINT", () => {
    if (server.listening) {
        mongoose.connection.close()
        server.close((err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            } else {
                console.info(`Server shutdown ⛔`)
                process.exit(0)
            }
        })
    }
})
