exports.sendResponse = function (res, msg, status, data) {
  res.status(status).send(JSON.stringify({
    message: msg,
    status : status,
    data   : data || {}
  }));
}