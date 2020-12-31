export interface ControllerResponse {
    code: number
    status: (code: number) => ControllerResponse
    json: (obj: any) => any
}