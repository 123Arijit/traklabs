import { IRouter, RequestHandler, Router } from "express"
import { RecordController } from "../controller/interface/record/record.interface"

export function CreateRecordRouter(controllers: { record: RecordController }, makeRouter: () => Router = Router): IRouter {

    const router = makeRouter()

    router
    .route("/getRecord/:id")
    .get(<RequestHandler><unknown>controllers.record.getRecord.bind(controllers.record))

    router
    .route("/setRecord")
    .post(<RequestHandler><unknown>controllers.record.setRecord.bind(controllers.record))

    return router
}
