export interface RabbitMQService {
    push(msg: string): Promise<void>
    pop(cb: (msg: string) => void|Promise<void>): Promise<void>
}