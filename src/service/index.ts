import { RabbitMQServiceImpl } from "./rabbitmq"
import dotenv from "dotenv"

dotenv.config()

export const RabbitMQService = new RabbitMQServiceImpl(process.env)
