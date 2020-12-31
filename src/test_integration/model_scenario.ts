import { connect, Mongoose, set } from "mongoose"
import RecordModel from "../model/record"

let mongoose: Mongoose

export async function before() {
    set("debug", false)
    mongoose = await connect("mongodb://localhost:27017/tranklabs-test", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
}

export async function after() {
    mongoose.connection.db.dropDatabase()
}

export { RecordModel as TestRecordModel }
