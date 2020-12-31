import { RecordController } from "../controller"
import { CreateRecordRouter } from "./record"

export const RecordRouter = CreateRecordRouter({ record: RecordController })
