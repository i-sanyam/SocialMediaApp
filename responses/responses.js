exports.sendResponse = function (res, msg, status, data) {
  res.send(JSON.stringify({
    message: msg,
    status : status,
    data   : data || {}
  }));
}