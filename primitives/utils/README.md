# Skyroc Utils

English | [简体中文](./README.zh.md)

A lightweight utility library providing essential helper functions for TypeScript/JavaScript projects, including array manipulation, async operations, observer patterns, form input handling, keyboard events, and more. Built with TypeScript for complete type safety.

## ✨ Features

- 🎯 **Full TypeScript Support** - Built with TypeScript, providing complete type inference and type safety
- 📦 **Lightweight & Modular** - Import only what you need
- 🔄 **Observer Pattern** - Simplified RxJS-like Subject implementation
- 🎹 **Keyboard Support** - Comprehensive keyboard code constants and utilities
- 📝 **Form Utilities** - Helper functions for form input handling
- 🧰 **Radash Integration** - Re-exports all utilities from the powerful [radash](https://radash-docs.vercel.app/) library
- ⚡ **Tree-shakeable** - Optimized for modern bundlers

## 📦 Installation

```bash
npm install skyroc-utils
# or
pnpm add skyroc-utils
# or
yarn add skyroc-utils
```

## 🚀 Quick Start

```typescript
import { toArray, sleep, createSubject, isNil, KeyCode } from 'skyroc-utils';

// Convert value to array
const arr = toArray('hello'); // ['hello']

// Async delay
await sleep(1000);

// Observer pattern
const subject = createSubject<string>();
subject.subscribe(value => console.log(value));
subject.next('Hello!');

// Type checking
isNil(null); // true
isNil(undefined); // true
isNil(0); // false

// Keyboard codes
console.log(KeyCode.ENTER); // 13
```

## 📚 API Reference

### Array Utilities

#### `toArray<T>(value?: T | T[] | null): T[]`

Converts a value to an array. Returns an empty array for null/undefined values.

```typescript
import { toArray } from 'skyroc-utils';

toArray('hello');           // ['hello']
toArray(['a', 'b']);        // ['a', 'b']
toArray(null);              // []
toArray(undefined);         // []
```

### Async Utilities

#### `sleep(ms: number): Promise<void>`

Creates a promise that resolves after the specified delay in milliseconds.

```typescript
import { sleep } from 'skyroc-utils';

async function example() {
  console.log('Start');
  await sleep(1000);
  console.log('After 1 second');
}
```

### Observer Pattern

#### `createSubject<T>(): Subject<T>`

Creates a Subject that can emit values to multiple observers. Implements a simplified RxJS Subject pattern.

**Returns:** `Subject<T>` with the following properties and methods:

- `next(value: T): void` - Emit a new value to all observers
- `subscribe(observer: Observer<T> | ((v: T) => void)): Teardown` - Subscribe to value updates
- `complete(): void` - Complete the subject and clear all observers
- `unsubscribe(): void` - Remove all observers
- `hasObservers(): boolean` - Check if there are active observers
- `size: number` - Number of current observers (read-only)
- `closed: boolean` - Whether the subject is closed (read-only)

**Example:**

```typescript
import { createSubject } from 'skyroc-utils';

const subject = createSubject<string>();

// Subscribe with function
const subscription1 = subject.subscribe(value => {
  console.log('Observer 1:', value);
});

// Subscribe with observer object
const subscription2 = subject.subscribe({
  next: value => console.log('Observer 2:', value)
});

// Emit values
subject.next('Hello');   // Both observers receive 'Hello'
subject.next('World');   // Both observers receive 'World'

// Unsubscribe specific observer
subscription1.unsubscribe();

subject.next('Goodbye'); // Only Observer 2 receives this

// Complete the subject
subject.complete();
```

### Form Input Utilities

#### `isCheckBoxInput(element: FieldElement): element is HTMLInputElement`

Checks if the element is a checkbox input.

#### `isRadioInput(element: FieldElement): element is HTMLInputElement`

Checks if the element is a radio input.

#### `isFileInput(element: FieldElement): element is HTMLInputElement`

Checks if the element is a file input.

#### `getEventValue(valuePropName?: string, ...args: any[]): any`

Extracts the value from an event object. Handles checkboxes (returns `checked`), regular inputs (returns `value`), and non-event values.

**Example:**

```typescript
import { getEventValue, isCheckBoxInput } from 'skyroc-utils';

// In a form handler
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  const value = getEventValue('value', e);
  // For checkbox: returns e.target.checked
  // For other inputs: returns e.target.value
}
```

### Keyboard Utilities

#### `KeyCode`

Object containing keyboard key code constants and utility methods.

**Key Constants:**

```typescript
import { KeyCode } from 'skyroc-utils';

KeyCode.ENTER        // 13
KeyCode.ESC          // 27
KeyCode.SPACE        // 32
KeyCode.BACKSPACE    // 8
KeyCode.DELETE       // 46
KeyCode.TAB          // 9
KeyCode.UP           // 38
KeyCode.DOWN         // 40
KeyCode.LEFT         // 37
KeyCode.RIGHT        // 39
KeyCode.A            // 65
KeyCode.Z            // 90
// ... and many more
```

**Utility Methods:**

```typescript
// Check if a key code represents a character key
KeyCode.isCharacterKey(keyCode: number): boolean

// Check if a keyboard event is text-modifying
KeyCode.isTextModifyingKeyEvent(e: KeyboardEvent): boolean
```

**Example:**

```typescript
import { KeyCode } from 'skyroc-utils';

function handleKeyDown(e: KeyboardEvent) {
  if (e.keyCode === KeyCode.ENTER) {
    console.log('Enter key pressed');
  }

  if (KeyCode.isCharacterKey(e.keyCode)) {
    console.log('Character key pressed');
  }

  if (KeyCode.isTextModifyingKeyEvent(e)) {
    console.log('Text modification key');
  }
}
```

### Object Utilities

#### `shallowEqual(a: any, b: any): boolean`

Performs shallow equality comparison between two values.

```typescript
import { shallowEqual } from 'skyroc-utils';

shallowEqual({ a: 1 }, { a: 1 });           // true
shallowEqual({ a: 1 }, { a: 2 });           // false
shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }); // false (different references)
```

#### `isObjectType(value: unknown): value is object`

Checks if a value is an object type.

#### `isEventObject(event: unknown): event is Event`

Checks if a value is an event object.

### Type Utilities

#### `isNil(val: unknown): val is null | undefined`

Checks if a value is `null` or `undefined`.

```typescript
import { isNil } from 'skyroc-utils';

isNil(null);       // true
isNil(undefined);  // true
isNil(0);          // false
isNil('');         // false
isNil(false);      // false
```

### General Utilities

#### `noop(): void`

A no-operation function that does nothing. Useful as a default callback.

```typescript
import { noop } from 'skyroc-utils';

function fetchData(onSuccess = noop) {
  // ... fetch logic
  onSuccess();
}
```

#### `omitUndefined<T extends object>(obj: T): Partial<T>`

Returns a new object with all `undefined` values removed.

```typescript
import { omitUndefined } from 'skyroc-utils';

const obj = { a: 1, b: undefined, c: 3 };
omitUndefined(obj); // { a: 1, c: 3 }
```

### Radash Re-exports

This package re-exports all utilities from [radash](https://radash-docs.vercel.app/), a powerful functional utility library. You can use any radash function directly from this package:

```typescript
import {
  unique,      // Array unique values
  group,       // Group array items
  debounce,    // Debounce function
  throttle,    // Throttle function
  retry,       // Retry async function
  parallel,    // Run promises in parallel
  // ... and 100+ more utilities
} from 'skyroc-utils';

const numbers = [1, 2, 2, 3, 3, 3];
unique(numbers); // [1, 2, 3]

const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];
group(users, u => u.role);
// { admin: [...], user: [...] }
```

For complete radash documentation, visit: [https://radash-docs.vercel.app/](https://radash-docs.vercel.app/)

## 🎯 Common Use Cases

### Debounced Search

```typescript
import { debounce } from 'skyroc-utils';

const debouncedSearch = debounce({ delay: 300 }, (query: string) => {
  console.log('Searching for:', query);
  // Perform search...
});

// Call multiple times quickly
debouncedSearch('h');
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hello'); // Only this will execute after 300ms
```

### Event Bus Pattern

```typescript
import { createSubject } from 'skyroc-utils';

interface AppEvent {
  type: 'userLogin' | 'userLogout' | 'dataUpdate';
  payload: any;
}

const eventBus = createSubject<AppEvent>();

// Subscribe in component A
eventBus.subscribe(event => {
  if (event.type === 'userLogin') {
    console.log('User logged in:', event.payload);
  }
});

// Emit from component B
eventBus.next({ type: 'userLogin', payload: { userId: 123 } });
```

### Safe Value Normalization

```typescript
import { toArray, isNil, omitUndefined } from 'skyroc-utils';

function normalizeConfig(config: any) {
  return omitUndefined({
    items: toArray(config.items),
    enabled: isNil(config.enabled) ? true : config.enabled,
    timeout: config.timeout
  });
}
```

## 📖 TypeScript Support

All functions and utilities are fully typed with TypeScript:

```typescript
import { createSubject, toArray, sleep } from 'skyroc-utils';

// Generic type support
const subject = createSubject<number>();
subject.next(42);        // ✅ OK
subject.next('hello');   // ❌ Type error

// Array type inference
const nums = toArray(123);    // number[]
const strs = toArray('abc');  // string[]

// Promise typing
const delay: Promise<void> = sleep(1000);
```

## 📄 License

MIT License

## 🔗 Links

- [GitHub Repository](https://github.com/Ohh-889/skyroc-ui)
- [Issue Tracker](https://github.com/Ohh-889/skyroc-ui/issues)
- [Radash Documentation](https://radash-docs.vercel.app/)

