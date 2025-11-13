const messages: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
};

export default class HttpError extends Error {
    status: number;

    constructor(status: number, message?: string) {
        super(message || messages[status] || 'Error');
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
