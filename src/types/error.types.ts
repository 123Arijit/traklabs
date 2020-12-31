export enum RecordErrorType {
    VALIDATION_ERROR=1,
    NOT_FOUND_ERROR=2,
    INSUFFICIENT_INPUT=3
}

export type ErrorType = RecordErrorType

export class RequestError extends Error {
    public type: ErrorType
}

export class RecordError extends RequestError {
    name: string = "UserError"
    constructor(public type: RecordErrorType, public message: string = "Record Error") {
        super(`${type}: ${message}`)
        this.type = type
    }
}
