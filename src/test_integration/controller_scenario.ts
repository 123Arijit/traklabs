import { before, after, TestRecordModel } from "./model_scenario"
import { RecordControllerImpl } from "../controller/record"

import dotenv from "dotenv"
import { ControllerResponse } from "../controller/interface/response"
import { ControllerNextFunction } from "../controller/interface/next"

dotenv.config()

export const TestRecordController = new RecordControllerImpl(TestRecordModel, process.env)

export function makeResponse(callback: (obj?: any) => any) {
    return {
        status(code: number) {
            this.code = code
            return this
        },
        json(obj: any) {
            callback(obj)
        }
    } as ControllerResponse
}

export const dummyNext = function() {
    // Ignore
} as ControllerNextFunction

export { before, after }
