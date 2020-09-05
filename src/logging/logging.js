const debug = true;

exports.log = function (apiReference, log) {
  if (!debug) return;
  try {
    log = JSON.stringify(log);
  } catch {}
  console.log("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
}

exports.logError = function (apiReference, log) {
  if (!debug) return;
  try {
    log = JSON.stringify(log);
  } catch {}
  console.error("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
}