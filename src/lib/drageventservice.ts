// support desktop and mobile
// support start, move, end
import * as hp from './jshelper';

const events = {
  start: ['mousedown', 'touchstart'],
  move: ['mousemove', 'touchmove'],
  end: ['mouseup', 'touchend']
};

export interface EventPosition {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
  screenX: number;
  screenY: number;
}

export interface Options {
  args?: any[];
  mouseArgs?: any[];
  touchArgs?: any[];
}

const DragEventService = {
  isTouch(e: MouseEvent | TouchEvent) {
    return e.type && e.type.startsWith('touch');
  },
  _getStore(el: Element | Document | Window) {
    // @ts-ignore
    if (!el._wrapperStore) {
      // @ts-ignore
      el._wrapperStore = [];
    }
    // @ts-ignore
    return el._wrapperStore;
  },
  on<T>(
    el: Element /*| Document | Window*/,
    name: string,
    handler: (event: MouseEvent | TouchEvent, eventPosition: EventPosition) => T,
    options?: Options
  ) {
    const { args, mouseArgs, touchArgs } = resolveOptions(options);
    const store = this._getStore(el);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ts = this;
    const wrapper = function (e: MouseEvent | TouchEvent) {
      let mouse: EventPosition;
      const isTouch = ts.isTouch(e);
      if (isTouch) {
        // touch
        const e1 = e as TouchEvent;
        mouse = {
          x: e1.changedTouches[0].pageX,
          y: e1.changedTouches[0].pageY,
          pageX: e1.changedTouches[0].pageX,
          pageY: e1.changedTouches[0].pageY,
          clientX: e1.changedTouches[0].clientX,
          clientY: e1.changedTouches[0].clientY,
          screenX: e1.changedTouches[0].screenX,
          screenY: e1.changedTouches[0].screenY
        };
        // TODO: why not handler(e1,mouse)   looks like this is to optimize bundling size
        // @ts-expect-error any
        return handler.call(this, e1, mouse);
      } else {
        // mouse
        const e2 = e as MouseEvent;
        mouse = {
          x: e2.pageX,
          y: e2.pageY,
          pageX: e2.pageX,
          pageY: e2.pageY,
          clientX: e2.clientX,
          clientY: e2.clientY,
          screenX: e2.screenX,
          screenY: e2.screenY
        };
        if (name === 'start' && e.which !== 1) {
          // not left button mousedown
          return;
        }
        // TODO: why not handler(e2,mouse)  looks like this is to optimize bundling size
        // @ts-expect-error any
        return handler.call(this, e2, mouse);
      }
    };
    store.push({ handler, wrapper });
    // follow format will cause big bundle size
    // 以下写法将会使打包工具认为hp是上下文, 导致打包整个hp
    // hp.on(el, events[name][0], wrapper, ...args)

    const p0 = events[name][0];
    const p1 = events[name][1];
    // @ts-ignore
    hp.on.call(null, el, p0, wrapper, ...[...args, ...mouseArgs]);
    // @ts-ignore
    hp.on.call(null, el, p1, wrapper, ...[...args, ...touchArgs]);
  },
  off(el: Element | Document | Window, name: string, handler: any, options?: Options) {
    const { args, mouseArgs, touchArgs } = resolveOptions(options);
    const store = this._getStore(el);
    for (let i = store.length - 1; i >= 0; i--) {
      const { handler: handler2, wrapper } = store[i];
      if (handler === handler2) {
        const p0 = events[name][0];
        const p1 = events[name][1];
        hp.off.call(null, el, p0, wrapper, ...[...args, ...mouseArgs]);
        hp.off.call(null, el, p1, wrapper, ...[...args, ...mouseArgs]);
        store.splice(i, 1);
      }
    }
  }
};

export default DragEventService;

function resolveOptions(options: Options = {}) {
  const args = options.args || [];
  const mouseArgs = options.mouseArgs || [];
  const touchArgs = options.touchArgs || [];
  return { args, mouseArgs, touchArgs };
}
