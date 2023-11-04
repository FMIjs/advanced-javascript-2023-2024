// pubsub
const eventEmitter = {
  listeners: {},
  on(eventName, cb) {
    // const eventListeners = this.listeners[eventName] || [];
    // eventListeners = eventListeners.concat(cb);
    // this.listeners[eventName] = eventListeners;
    this.listeners[eventName] = (this.listeners[eventName] || []).concat(cb);
  },
  emit(eventName, data) {
    // const eventListeners = this.listeners[eventName];
    // if (eventListeners) {
    //   for (let i = 0; i < eventListeners.length; i++) {
    //     const listener = eventListeners[i];
    //     listener(data);
    //   }
    // }
    (this.listeners[eventName] || []).forEach(cb => cb(data));
  }
};

eventEmitter.on('test', function cb(data) { console.log(1, data) });
eventEmitter.on('test', function cb(data) { console.log(2, data) });

setTimeout(() => {
  eventEmitter.emit('test', 'HELLO!');
}, 5000);

