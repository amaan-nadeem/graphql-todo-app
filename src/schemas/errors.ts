const FormatError = require('easygraphql-format-error');
const customFormatErrorFn = new FormatError([
  {name: 'UNAUTHORIZED_ACCESS', message: "fill the fields correctly", statusCode: 400},
  {name: 'UNPROCESSABLE_ENTITY_ERROR', message: "server is down will get back very soon!", statusCode: 403},
  {name: 'INTERNAL_SERVER_ERROR', message: "Internal server error", statusCode: 500},
  {name: 'INVALID_ID', message: "Invalid ID", statusCode: 400},
  {name: "TITLE_ERROR", message: "title is not allowed to be empty and its type must be string", statusCode: 400},
  {name: "DESCRIPTION_ERROR", message: "description is not allowed to be empty and its type must be string", statusCode: 400},
  {name: "INVALID_BODY", message: "Nothing is given to be updated", statusCode: 400}

]);
const errorName = customFormatErrorFn.errorName; 

export {
    errorName,
    FormatError,
    customFormatErrorFn
}