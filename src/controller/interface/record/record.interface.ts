import { ControllerNextFunction } from "../next"
import { ControllerRequest } from "../request"
import { ControllerResponse } from "../response"

export interface RecordController {
    getRecord: (req: ControllerRequest, res: ControllerResponse, next: ControllerNextFunction) => Promise<any>
    setRecord: (req: ControllerRequest, res: ControllerResponse, next: ControllerNextFunction) => Promise<any>
}
