// error handler for all the applications
handle = function (err, req, res, next) {
    console.log(err);
    var errorType = typeof err,
        code = 500,
        msg = { message: "Internal Server Error" };

    switch (err.name) {
        case "UnauthorizedError":
            code = err.status;
            msg = undefined;
            break;
        case "BadRequestError":
        case "UnauthorizedAccessError":
        case "NotFoundError":
            code = err.status;
            msg = err.inner;
            break;
        default:
            break;
    }
    console.log('handle error');
    return res.status(code).json({success: false, message: err.message});
};

module.exports = handle;