import { RecordControllerImpl } from "./record"
import RecordModel from "../model/record"

import dotenv from "dotenv"
import { RabbitMQService } from "../service"

dotenv.config()

export const RecordController = new RecordControllerImpl(RecordModel, RabbitMQService, process.env)
