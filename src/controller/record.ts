import { Model } from "mongoose"
import { RecordError, RecordErrorType } from "../types/error.types"
import { ControllerNextFunction } from "./interface/next"
import { RecordController } from "./interface/record/record.interface"
import { RecordDocument } from "../model/interface/record.interface"
import { ControllerRequest } from "./interface/request"
import { ControllerResponse } from "./interface/response"

import _ from "lodash"
import { RabbitMQService } from "src/service/interface/rabbitmq.interface"


export class RecordControllerImpl implements RecordController {

    constructor(public model: Model<RecordDocument>, public rabbitService: RabbitMQService, public config: any) { }

    private handleError(err: RecordError, res: ControllerResponse) {
        if (err.name === "RecordError") {
            if (err.type === RecordErrorType.VALIDATION_ERROR) {
                res.status(400).json({ error: err.message || "invalid record" })
            } else if (err.type === RecordErrorType.NOT_FOUND_ERROR) {
                res.status(404).json({ error: err.message || "record not found" })
            } else if (err.type === RecordErrorType.INSUFFICIENT_INPUT) {
                res.status(400).json({ error: err.message || "insufficient input" })
            } else {
                res.status(500).json({ error: err.message || "unknown record error" })
            }
        } else {
            res.status(500).json({ error: err.message || "internal server error" })
        }
    }

    async getRecord(req: ControllerRequest, res: ControllerResponse, next: ControllerNextFunction) {
        try {
            console.log(req.params)
            let { id } = req.params??{}
            if (id) {
                let unsanitizedRecord = await this.model.findOne({ _id: id })
                if (unsanitizedRecord) {
                    let record = {
                        id: unsanitizedRecord.id,
                        name: unsanitizedRecord.name,
                        email: unsanitizedRecord.email
                    }
                    res.status(200).json({ record })
                } else {
                    throw new RecordError(RecordErrorType.NOT_FOUND_ERROR)
                }
            } else {
                throw new RecordError(RecordErrorType.INSUFFICIENT_INPUT)
            }
        } catch (err) {
            this.handleError(err, res)
        }
    }

    async setRecord(req: ControllerRequest, res: ControllerResponse, next: ControllerNextFunction) {
        try {
            let unsanitizedRecordData = req.body??{}
            let sanitizedRecordData = _.pick(unsanitizedRecordData, ["name", "email"])
            let unsanitizedRecord = new this.model(sanitizedRecordData)

            let err = unsanitizedRecord.validateSync()
            if (err) throw new RecordError(RecordErrorType.VALIDATION_ERROR, err.message)
        
            await unsanitizedRecord.save()

            let record = {
                id: unsanitizedRecord.id,
                name: unsanitizedRecord.name,
                email: unsanitizedRecord.email
            }

            await this.rabbitService.push(record.id)

            res.status(200).json({ record })
        } catch (err) {
            this.handleError(err, res)
        }
    }
    
}
