"use strict";
exports.errorName = {
    UNPROCESSABLE_ENTITY_ERROR: {
        message: "Server is down please try again later",
        statusCode: 403
    },
    UNAUTHORIZED_ERROR: {
        message: "PLease fill the fields correctly",
        error: 401
    },
    NOT_FOUND_ERROR: {
        message: "404 route not found",
        error: 404
    },
    INTERNAL_SERVER_ERROR: {
        message: "Internal server error",
        error: 404
    },
    INVALID_ID: {
        statusCode: 401,
        message: "Invalid Id given"
    }
};
