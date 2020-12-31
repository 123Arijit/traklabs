import { Rabbit } from "rabbit-queue"
import { RabbitMQService } from "./interface/rabbitmq.interface"

export class RabbitMQServiceImpl implements RabbitMQService {

    rabbit: Rabbit

    constructor(public config: any) {
        this.rabbit = new Rabbit(this.config.RABBIT_URL, {
            scheduledPublish: true
        })
        
        this.rabbit.createQueue(this.config.RABBIT_QUEUE_NAME)
    }

    async push(msg: string) {
        this.rabbit.publish(this.config.RABBIT_QUEUE_NAME, { msg })
    }

    async pop(cb: (msg: string) => void|Promise<void>) {
        cb('[blank]')
    }
}