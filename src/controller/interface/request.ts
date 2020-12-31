export interface ControllerRequest {
    headers: { [key: string]: string }
    params: { [key: string]: string }
    body: any
    context?: any
    files?: any
    file?: any
}