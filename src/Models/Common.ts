export class ApiResponse {
    statusCode: CustomStatusCode;
    message: string;
    data: any;
}

export enum CustomStatusCode {
    Success = 1,
    Error = 0
}

