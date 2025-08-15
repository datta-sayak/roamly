class ApiResponse{
    constructor(statusCode, data, message="Success", err) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.statusCode = statusCode < 400;
    }
}

export { ApiResponse }