const ErrorTool = require('../error/ErrorTool')

module.exports = function (err, req, res, next) {
    if (err instanceof ErrorTool) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непередбачена помилка."})
}