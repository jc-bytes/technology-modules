/** LF-delimited ASCII reports. UART notifications may split or combine lines.
 * Legacy status-only senders remain supported, without a distance.
 * Invalid or damaged reports become UNKNOWN and clear the displayed distance.
 */
export function parseReport(line) {
  if (['NEAR','FAR','UNKNOWN'].includes(line)) return {state:line,distanceCm:null};
  const match=/^(NEAR|FAR),(\d{1,3}(?:\.\d)?)$/.exec(line);
  if (!match) return {state:'UNKNOWN',distanceCm:null};
  const distanceCm=Number(match[2]),state=match[1];
  if(distanceCm<2||distanceCm>400||(state==='NEAR')!==(distanceCm<=30))return {state:'UNKNOWN',distanceCm:null};
  return {state,distanceCm};
}
function validLine(line) {return line==='UNKNOWN'||parseReport(line).state!=='UNKNOWN';}
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
        events.push(validLine(line) ? line : 'UNKNOWN');
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
      // Only uppercase words, decimal digits, comma and decimal point are allowed.
      if (!((byte >= 65 && byte <= 90) || (byte >= 48 && byte <= 57) || byte === 44 || byte === 46) || line.length >= maxLineBytes) {
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
