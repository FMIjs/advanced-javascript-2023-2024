function syncIterator(list, fn) {
  for (let i = 0; i < list.length; i++) {
    fn(list[i]);
  }
}

function asyncIterator(list, fn) {
  if (list.length === 0) return;
  setTimeout(function () {
    const item = list[0];
    fn(item);
    asyncIterator(list.slice(1), fn);
  }, 0);
}

process.nextTick(function nextTickAsyncOp() {

});



// stack: cb3
// micro task queue [nextTickAsyncOp]
// event queue [ev1, ev2]
// macro task queue [cb4, cb5, cb6, cb7, cb8, cb9]
