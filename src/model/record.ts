import { model, Schema } from "mongoose"
import { RecordDocument } from "./interface/record.interface"

export const RecordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

export default model<RecordDocument>("Record", RecordSchema)
