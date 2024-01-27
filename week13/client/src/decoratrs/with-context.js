let isRenderScheduled = false;
function scheduleRender(renderCallback) {
  if (isRenderScheduled) return;
  isRenderScheduled = true;
  Promise.resolve().then(() => {
    isRenderScheduled = false;
    renderCallback();
  });
}

export function createContextForComponent(cmp, defaultValues = {}) {
  return new Proxy(defaultValues, {
    set(target, key, newValue) {
      const currentValue = Reflect.get(target, key);
      if (currentValue !== newValue) scheduleRender(cmp.render.bind(cmp));
      return Reflect.set(target, key, newValue);
    }
  })
}

export function withContext(initialContext) {
  return function (klass, desc) {
    if (desc.kind !== 'class') throw new Error("Decorator withContext can only be applied on classes!");
    return class extends klass {
      constructor() {
        super();
        this.context = createContextForComponent(this, initialContext);
      }
    }
  }
}
