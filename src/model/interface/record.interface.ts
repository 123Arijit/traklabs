import { CreateQuery, Document, FilterQuery, Query, UpdateQuery } from "mongoose"

export interface RecordDocument extends Document {
    id: string
    name: string
    email: string
}
