const debug = true;

export function log(apiReference, log) {
  if (!debug) return;
  try {
    log = JSON.stringify(log);
  } catch {}
  console.log("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
}

export function logError(apiReference, log) {
  if (!debug) return;
  try {
    log = JSON.stringify(log);
  } catch {}
  console.error("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
}