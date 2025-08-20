/**
 * Represents a cleanup function that can be called to unsubscribe from a subscription
 */
export type Teardown = { unsubscribe: () => void };

/**
 * Basic observer interface that can receive values
 */
export interface Observer<T> {
  next: (value: T) => void;
}

/**
 * Subject interface that extends Observer with additional functionality
 * A Subject is both an Observable (can be subscribed to) and an Observer (can emit values)
 */
export interface Subject<T> extends Observer<T> {
  /** Indicates whether the subject is closed for new subscriptions */
  readonly closed: boolean;
  /** Completes the subject and clears all observers */
  complete: () => void;
  /** Checks if there are any active observers */
  hasObservers: () => boolean;
  /** Number of current observers */
  readonly size: number;
  /** Subscribe to value updates with either an Observer object or a next function */
  subscribe: (obs: Observer<T> | ((v: T) => void)) => Teardown;
  /** Unsubscribe all observers */
  unsubscribe: () => void;
}

/**
 * - Creates a new Subject that can be used to emit values to multiple observers
 * Implements a simplified version of RxJS Subject pattern
 * @example
 * const bus = createSubject<string>();
 * const a = bus.subscribe(v => console.log('A:', v));
 * const b = bus.subscribe({ next: v => console.log('B:', v) });
 * bus.next('hello');   // A: hello / B: hello
 * a.unsubscribe();
 * bus.next('world');   // B: world
 * bus.complete();
 */
export function createSubject<T>(): Subject<T> {
  // Set to store all active observers
  const observers = new Set<Observer<T>>();
  // Flag to track if the subject is closed
  let _closed = false;

  /**
   * Subscribes to the subject with either an Observer object or a next function
   * Returns a teardown object that can be used to unsubscribe
   */
  const subscribe = (obsOrFn: Observer<T> | ((v: T) => void)): Teardown => {
    // If subject is closed, return a no-op unsubscribe
    if (_closed) return { unsubscribe: () => {} };
    // Convert function to Observer object if needed
    const obs: Observer<T> = typeof obsOrFn === 'function' ? { next: obsOrFn } : obsOrFn;
    observers.add(obs);
    let done = false;
    return {
      unsubscribe: () => {
        if (done) return;
        done = true;
        observers.delete(obs);
      }
    };
  };

  /**
   * Emits a new value to all observers
   * Takes a snapshot of observers to avoid issues if collection is modified during iteration
   */
  const next = (value: T) => {
    if (_closed || observers.size === 0) return;
    // Take a snapshot to avoid collection modification during iteration
    const snapshot = Array.from(observers);
    for (const ob of snapshot) {
      try {
        ob.next?.(value);
      } catch (e) {
        /* Report or ignore errors */ console.error(e);
      }
    }
  };

  /**
   * Removes all observers without closing the subject
   */
  const unsubscribe = () => {
    observers.clear();
  };

  /**
   * Marks the subject as completed and removes all observers
   */
  const complete = () => {
    _closed = true;
    observers.clear();
  };

  return {
    get closed() {
      return _closed;
    },
    complete,
    hasObservers: () => observers.size > 0,
    next,
    get size() {
      return observers.size;
    },
    subscribe,
    unsubscribe
  };
}
