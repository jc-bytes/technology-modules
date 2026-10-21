/**
 * Small, fail-closed ASCII notification protocol. Each message ends in LF;
 * CRLF is accepted too. Notifications may contain fragments or several lines.
 *
 * createLineParser({maxLineBytes = 16}) returns:
 *   push(Uint8Array) -> Array<'NEAR' | 'FAR' | 'UNKNOWN'>
 *   reset() -> void, clears partial/discarded input on disconnect/reconnect.
 *
 * Malformed bytes, misplaced CR and oversized lines emit UNKNOWN immediately,
 * once per bad line. The remainder is discarded through LF, so a suffix such
 * as FAR cannot turn a damaged line into a safe report. Empty or unsupported
 * complete lines produce UNKNOWN. No TextDecoder replacement is allowed.
 *
 * maxLineBytes bounds content bytes, excluding the optional CR before LF.
 * This module does not connect to Bluetooth or make claims about hardware.
 */
export function createLineParser({ maxLineBytes = 16 } = {}) {
  if (!Number.isInteger(maxLineBytes) || maxLineBytes < 7 || maxLineBytes > 256) {
    throw new RangeError('maxLineBytes must be an integer from 7 to 256');
  }
  let line = '';
  let pendingCR = false;
  let discarding = false;

  function reset() {
    line = '';
    pendingCR = false;
    discarding = false;
  }

  function push(bytes) {
    if (!(bytes instanceof Uint8Array)) {
      throw new TypeError('push expects Uint8Array notification bytes');
    }
    const events = [];
    function rejectLine() {
      events.push('UNKNOWN');
      line = '';
      pendingCR = false;
      discarding = true;
    }
    for (const byte of bytes) {
      if (discarding) {
        if (byte === 10) reset();
        continue;
      }
      if (byte === 10) {
        events.push(line === 'NEAR' || line === 'FAR' || line === 'UNKNOWN' ? line : 'UNKNOWN');
        reset();
        continue;
      }
      // Once CR appears, only LF may follow. CR may span notifications.
      if (pendingCR) {
        rejectLine();
        continue;
      }
      if (byte === 13) {
        pendingCR = true;
        continue;
      }
      // Strict ASCII uppercase only: spaces, NUL, Unicode and lowercase fail.
      if (byte < 65 || byte > 90 || line.length >= maxLineBytes) {
        rejectLine();
        continue;
      }
      line += String.fromCharCode(byte);
    }
    return events;
  }
  return { push, reset };
}

/**
 * classifyFreshness(null, nowMs) -> 'waiting'.
 * classifyFreshness({state, receivedAt}, nowMs, staleAfterMs = 3000)
 *   -> 'stale' if age > staleAfterMs, otherwise the exact protocol state.
 * Use the same monotonic clock for receivedAt and nowMs, e.g. performance.now().
 * Invalid report data or a clock that moves backwards conservatively returns
 * UNKNOWN. Callers may sound only a fresh NEAR; all other results are silent.
 */
export function classifyFreshness(latest, nowMs, staleAfterMs = 3000) {
  if (!Number.isFinite(staleAfterMs) || staleAfterMs < 0) {
    throw new RangeError('staleAfterMs must be a finite nonnegative number');
  }
  if (latest == null) return 'waiting';
  if (!Number.isFinite(nowMs) || !Number.isFinite(latest.receivedAt)) return 'UNKNOWN';
  const age = nowMs - latest.receivedAt;
  if (age < 0) return 'UNKNOWN';
  if (age > staleAfterMs) return 'stale';
  return latest.state === 'NEAR' || latest.state === 'FAR' || latest.state === 'UNKNOWN'
    ? latest.state
    : 'UNKNOWN';
}
