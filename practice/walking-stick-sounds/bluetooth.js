export const UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
export const MICROBIT_TX = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

/** One explicitly chosen micro:bit connection. No browser globals or automatic reconnect. */
export class MicrobitConnection {
  constructor({ bluetooth, onState = () => {}, onBytes = () => {} } = {}) {
    this.bluetooth = bluetooth;
    this.onState = onState;
    this.onBytes = onBytes;
    this.generation = 0;
    this.session = null;
  }

  active(session) {
    return this.session === session && session.generation === this.generation;
  }

  cleanup(session) {
    if (!session) return;
    session.connected = false;
    session.device?.removeEventListener('gattserverdisconnected', session.disconnected);
    session.characteristic?.removeEventListener('characteristicvaluechanged', session.changed);
    if (session.subscribed) {
      session.subscribed = false;
      try {
        Promise.resolve(session.characteristic.stopNotifications()).catch(() => {});
      } catch { /* A disconnected device can reject notification cleanup. */ }
    }
    // Do not let a late operation from an old session disconnect a newer session.
    const usedByNewSession = this.session && this.session !== session &&
      this.session.device === session.device;
    if (!usedByNewSession && session.device?.gatt?.connected) {
      try { session.device.gatt.disconnect(); } catch { /* Already disconnected. */ }
    }
  }

  async connect() {
    const previous = this.session;
    this.session = null;
    const generation = ++this.generation;
    this.cleanup(previous);
    if (!this.bluetooth?.requestDevice) {
      this.onState({ state: 'error', message: 'Web Bluetooth is unavailable. Open this page in a supported browser on a computer with Bluetooth.' });
      return;
    }
    const session = { generation, device: null, characteristic: null, subscribed: false, connected: false };
    this.session = session;
    this.onState({ state: 'connecting' });
    let phase = 'chooser';
    try {
      // Invoke requestDevice before the first await, preserving the button's user gesture.
      session.device = await this.bluetooth.requestDevice({
        filters: [{ namePrefix: 'BBC micro:bit' }],
        optionalServices: [UART_SERVICE],
      });
      if (!this.active(session)) { this.cleanup(session); return; }
      session.disconnected = () => {
        if (!this.active(session)) return;
        this.session = null;
        ++this.generation;
        this.cleanup(session);
        this.onState({ state: 'disconnected', deviceName: session.device.name });
      };
      session.device.addEventListener('gattserverdisconnected', session.disconnected);
      phase = 'connection';
      const server = await session.device.gatt.connect();
      if (!this.active(session)) { this.cleanup(session); return; }
      phase = 'service';
      const service = await server.getPrimaryService(UART_SERVICE);
      if (!this.active(session)) { this.cleanup(session); return; }
      phase = 'characteristic';
      session.characteristic = await service.getCharacteristic(MICROBIT_TX);
      if (!this.active(session)) { this.cleanup(session); return; }
      const properties = session.characteristic.properties;
      if (properties && !properties.notify && !properties.indicate) {
        throw new Error('unsupported-uart');
      }
      session.changed = event => {
        if (!this.active(session) || !session.connected) return;
        const value = event.target.value;
        if (!value) return;
        this.onBytes(new Uint8Array(value.buffer, value.byteOffset, value.byteLength).slice());
      };
      session.characteristic.addEventListener('characteristicvaluechanged', session.changed);
      phase = 'subscription';
      await session.characteristic.startNotifications();
      session.subscribed = true;
      if (!this.active(session)) { this.cleanup(session); return; }
      session.connected = true;
      this.onState({ state: 'connected', deviceName: session.device.name });
    } catch (error) {
      const wasActive = this.active(session);
      if (wasActive) this.session = null;
      this.cleanup(session);
      if (!wasActive) return;
      this.onState({ state: 'error', message: connectionMessage(error, phase) });
    }
  }

  disconnect() {
    const session = this.session;
    this.session = null;
    ++this.generation;
    this.cleanup(session);
    this.onState({ state: 'disconnected', ...(session?.device?.name ? { deviceName: session.device.name } : {}) });
  }
}

function connectionMessage(error, phase) {
  if (phase === 'chooser' && error?.name === 'NotFoundError') {
    return 'No micro:bit selected. Turn on Bluetooth, then choose Connect and select your micro:bit.';
  }
  if ((phase === 'service' || phase === 'characteristic') && error?.name === 'NotFoundError') {
    return 'The micro:bit UART service is missing. Download the sound sender program with Bluetooth UART enabled, then reconnect.';
  }
  if (error?.message === 'unsupported-uart') {
    return 'This UART characteristic cannot send updates. Download the micro:bit sound sender program, then reconnect.';
  }
  if (phase === 'chooser' && error?.name === 'SecurityError') {
    return 'Bluetooth access is blocked. Allow Bluetooth for this page, then choose Connect again.';
  }
  if (phase === 'subscription') {
    return 'Could not receive Bluetooth updates. Check the sender program uses No Pairing Required, close other Bluetooth apps, then reconnect.';
  }
  return 'Could not connect. Turn on Bluetooth, keep the micro:bit nearby, and check No Pairing Required in its sender program. Then reconnect.';
}
