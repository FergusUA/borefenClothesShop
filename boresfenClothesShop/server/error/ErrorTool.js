class ErrorTool extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ErrorTool(404, message)
    }

    static internal(message) {
        return new ErrorTool(500, message)
    }

    static forbidden(message) {
        return new ErrorTool(403, message)
    }
}

module.exports = ErrorTool