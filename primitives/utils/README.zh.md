# Skyroc Utils

[English](./README.md) | 简体中文

一个轻量级实用工具库，为 TypeScript/JavaScript 项目提供必要的辅助函数，包括数组操作、异步操作、观察者模式、表单输入处理、键盘事件等。使用 TypeScript 构建，提供完整的类型安全保障。

## ✨ 特性

- 🎯 **完整的 TypeScript 支持** - 使用 TypeScript 构建，提供完整的类型推断和类型安全
- 📦 **轻量化和模块化** - 只导入你需要的功能
- 🔄 **观察者模式** - 简化版类 RxJS Subject 实现
- 🎹 **键盘支持** - 全面的键盘码常量和工具函数
- 📝 **表单工具** - 表单输入处理的辅助函数
- 🧰 **Radash 集成** - 重新导出强大的 [radash](https://radash-docs.vercel.app/) 库的所有工具
- ⚡ **Tree-shakeable** - 针对现代打包工具优化

## 📦 安装

```bash
npm install @skyroc/utils
# 或
pnpm add @skyroc/utils
# 或
yarn add @skyroc/utils
```

## 🚀 快速开始

```typescript
import { toArray, sleep, createSubject, isNil, KeyCode } from '@skyroc/utils';

// 将值转换为数组
const arr = toArray('hello'); // ['hello']

// 异步延迟
await sleep(1000);

// 观察者模式
const subject = createSubject<string>();
subject.subscribe(value => console.log(value));
subject.next('Hello!');

// 类型检查
isNil(null); // true
isNil(undefined); // true
isNil(0); // false

// 键盘码
console.log(KeyCode.ENTER); // 13
```

## 📚 API 参考

### 数组工具

#### `toArray<T>(value?: T | T[] | null): T[]`

将值转换为数组。对于 null/undefined 值返回空数组。

```typescript
import { toArray } from '@skyroc/utils';

toArray('hello');           // ['hello']
toArray(['a', 'b']);        // ['a', 'b']
toArray(null);              // []
toArray(undefined);         // []
```

### 异步工具

#### `sleep(ms: number): Promise<void>`

创建一个在指定毫秒数后解析的 Promise。

```typescript
import { sleep } from '@skyroc/utils';

async function example() {
  console.log('开始');
  await sleep(1000);
  console.log('1秒后');
}
```

### 观察者模式

#### `createSubject<T>(): Subject<T>`

创建一个可以向多个观察者发送值的 Subject。实现了简化版的 RxJS Subject 模式。

**返回:** 具有以下属性和方法的 `Subject<T>`：

- `next(value: T): void` - 向所有观察者发送新值
- `subscribe(observer: Observer<T> | ((v: T) => void)): Teardown` - 订阅值更新
- `complete(): void` - 完成 subject 并清除所有观察者
- `unsubscribe(): void` - 移除所有观察者
- `hasObservers(): boolean` - 检查是否有活跃的观察者
- `size: number` - 当前观察者数量（只读）
- `closed: boolean` - subject 是否已关闭（只读）

**示例:**

```typescript
import { createSubject } from '@skyroc/utils';

const subject = createSubject<string>();

// 使用函数订阅
const subscription1 = subject.subscribe(value => {
  console.log('观察者 1:', value);
});

// 使用观察者对象订阅
const subscription2 = subject.subscribe({
  next: value => console.log('观察者 2:', value)
});

// 发送值
subject.next('Hello');   // 两个观察者都收到 'Hello'
subject.next('World');   // 两个观察者都收到 'World'

// 取消订阅特定观察者
subscription1.unsubscribe();

subject.next('Goodbye'); // 只有观察者 2 收到

// 完成 subject
subject.complete();
```

### 表单输入工具

#### `isCheckBoxInput(element: FieldElement): element is HTMLInputElement`

检查元素是否为复选框输入。

#### `isRadioInput(element: FieldElement): element is HTMLInputElement`

检查元素是否为单选框输入。

#### `isFileInput(element: FieldElement): element is HTMLInputElement`

检查元素是否为文件输入。

#### `getEventValue(valuePropName?: string, ...args: any[]): any`

从事件对象中提取值。处理复选框（返回 `checked`）、常规输入（返回 `value`）和非事件值。

**示例:**

```typescript
import { getEventValue, isCheckBoxInput } from '@skyroc/utils';

// 在表单处理器中
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  const value = getEventValue('value', e);
  // 对于复选框: 返回 e.target.checked
  // 对于其他输入: 返回 e.target.value
}
```

### 键盘工具

#### `KeyCode`

包含键盘按键码常量和工具方法的对象。

**按键常量:**

```typescript
import { KeyCode } from '@skyroc/utils';

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
// ... 还有更多
```

**工具方法:**

```typescript
// 检查按键码是否代表字符键
KeyCode.isCharacterKey(keyCode: number): boolean

// 检查键盘事件是否为文本修改键
KeyCode.isTextModifyingKeyEvent(e: KeyboardEvent): boolean
```

**示例:**

```typescript
import { KeyCode } from '@skyroc/utils';

function handleKeyDown(e: KeyboardEvent) {
  if (e.keyCode === KeyCode.ENTER) {
    console.log('按下了回车键');
  }

  if (KeyCode.isCharacterKey(e.keyCode)) {
    console.log('按下了字符键');
  }

  if (KeyCode.isTextModifyingKeyEvent(e)) {
    console.log('文本修改键');
  }
}
```

### 对象工具

#### `shallowEqual(a: any, b: any): boolean`

执行两个值之间的浅层相等比较。

```typescript
import { shallowEqual } from '@skyroc/utils';

shallowEqual({ a: 1 }, { a: 1 });           // true
shallowEqual({ a: 1 }, { a: 2 });           // false
shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }); // false (不同的引用)
```

#### `isObjectType(value: unknown): value is object`

检查值是否为对象类型。

#### `isEventObject(event: unknown): event is Event`

检查值是否为事件对象。

### 类型工具

#### `isNil(val: unknown): val is null | undefined`

检查值是否为 `null` 或 `undefined`。

```typescript
import { isNil } from '@skyroc/utils';

isNil(null);       // true
isNil(undefined);  // true
isNil(0);          // false
isNil('');         // false
isNil(false);      // false
```

### 通用工具

#### `noop(): void`

一个什么都不做的空操作函数。适合用作默认回调。

```typescript
import { noop } from '@skyroc/utils';

function fetchData(onSuccess = noop) {
  // ... 获取逻辑
  onSuccess();
}
```

#### `omitUndefined<T extends object>(obj: T): Partial<T>`

返回一个移除了所有 `undefined` 值的新对象。

```typescript
import { omitUndefined } from '@skyroc/utils';

const obj = { a: 1, b: undefined, c: 3 };
omitUndefined(obj); // { a: 1, c: 3 }
```

### Radash 重导出

此包重新导出了 [radash](https://radash-docs.vercel.app/) 的所有工具，这是一个强大的函数式工具库。你可以直接从此包使用任何 radash 函数：

```typescript
import {
  unique,      // 数组去重
  group,       // 分组数组项
  debounce,    // 防抖函数
  throttle,    // 节流函数
  retry,       // 重试异步函数
  parallel,    // 并行运行 promises
  // ... 还有 100+ 个工具
} from '@skyroc/utils';

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

完整的 radash 文档，请访问: [https://radash-docs.vercel.app/](https://radash-docs.vercel.app/)

## 🎯 常见用例

### 防抖搜索

```typescript
import { debounce } from '@skyroc/utils';

const debouncedSearch = debounce({ delay: 300 }, (query: string) => {
  console.log('搜索:', query);
  // 执行搜索...
});

// 快速多次调用
debouncedSearch('h');
debouncedSearch('he');
debouncedSearch('hel');
debouncedSearch('hello'); // 只有这个会在 300ms 后执行
```

### 事件总线模式

```typescript
import { createSubject } from '@skyroc/utils';

interface AppEvent {
  type: 'userLogin' | 'userLogout' | 'dataUpdate';
  payload: any;
}

const eventBus = createSubject<AppEvent>();

// 在组件 A 中订阅
eventBus.subscribe(event => {
  if (event.type === 'userLogin') {
    console.log('用户登录:', event.payload);
  }
});

// 从组件 B 发送
eventBus.next({ type: 'userLogin', payload: { userId: 123 } });
```

### 安全值标准化

```typescript
import { toArray, isNil, omitUndefined } from '@skyroc/utils';

function normalizeConfig(config: any) {
  return omitUndefined({
    items: toArray(config.items),
    enabled: isNil(config.enabled) ? true : config.enabled,
    timeout: config.timeout
  });
}
```

## 📖 TypeScript 支持

所有函数和工具都完全使用 TypeScript 类型化：

```typescript
import { createSubject, toArray, sleep } from '@skyroc/utils';

// 泛型类型支持
const subject = createSubject<number>();
subject.next(42);        // ✅ OK
subject.next('hello');   // ❌ 类型错误

// 数组类型推断
const nums = toArray(123);    // number[]
const strs = toArray('abc');  // string[]

// Promise 类型
const delay: Promise<void> = sleep(1000);
```

## 📄 许可证

MIT License

## 🔗 链接

- [GitHub 仓库](https://github.com/Ohh-889/skyroc-ui)
- [问题跟踪](https://github.com/Ohh-889/skyroc-ui/issues)
- [Radash 文档](https://radash-docs.vercel.app/)
