# Skyroc Type Utils

[English](./README.md) | 简体中文

用于表单处理、路径操作和类型转换的高级 TypeScript 实用类型。提供全面的类型工具集合，通过强大的类型级编程能力增强 TypeScript 的类型系统。

## ✨ 特性

- 🎯 **高级类型工具** - 丰富的工具类型集合，用于复杂的类型转换
- 📝 **表单类型支持** - 专为表单元素和自定义组件设计的类型
- 🛤️ **路径操作** - 类型安全的路径类型，用于嵌套对象访问
- 🔧 **函数类型助手** - 从对象中提取和操作函数类型
- 💪 **深层类型操作** - 深度可选、深度部分和嵌套类型工具
- 🎨 **类型美化** - 使复杂的交叉类型在 IDE 中更易读
- ⚡ **零运行时开销** - 所有工具都是类型级的，零运行时开销

## 📦 安装

```bash
npm install skyroc-type-utils
# 或
pnpm add skyroc-type-utils
# 或
yarn add skyroc-type-utils
```

## 🚀 快速开始

```typescript
import type {
  DeepPartial,
  LeafPaths,
  PathToType,
  OnlyFunctions,
  Prettify
} from 'skyroc-type-utils';

// 嵌套对象的深度部分类型
type User = {
  name: string;
  address: {
    city: string;
    street: string;
  };
};
type PartialUser = DeepPartial<User>;
// { name?: string; address?: { city?: string; street?: string } }

// 嵌套属性的类型安全路径
type UserPaths = LeafPaths<User>;
// "name" | "address.city" | "address.street"

// 从路径获取类型
type CityType = PathToType<User, "address.city">; // string

// 仅提取函数属性
type API = {
  data: string;
  fetch(): Promise<void>;
  update(id: number): void;
};
type APIFunctions = OnlyFunctions<API>;
// { fetch: () => Promise<void>; update: (id: number) => void }
```

## 📚 API 参考

### 函数类型工具

#### `Fn`

通用函数类型。

```typescript
type Fn = (...args: any[]) => any;
```

#### `Noop`

无操作函数类型。

```typescript
type Noop = () => void;
```

#### `OnlyFunctions<T>`

从对象类型中提取仅包含函数的属性。

```typescript
interface Foo {
  a: number;
  b?: string;
  c(): void;
  d: (x: number) => string;
  e?: () => void;
}

type FooFunctions = OnlyFunctions<Foo>;
// {
//   c: () => void;
//   d: (x: number) => string;
//   e?: (() => void) | undefined;
// }
```

#### `FunctionKeys<T>`

从对象类型中提取函数属性的键。

```typescript
interface Foo {
  a: number;
  b?: string;
  c(): void;
  d: (x: number) => string;
  e?: () => void;
}

type FooFnKeys = FunctionKeys<Foo>; // 'c' | 'd' | 'e'
```

#### `FunctionUnion<T>`

创建对象中所有函数类型的联合类型。

```typescript
interface Foo {
  a: number;
  c(): void;
  d: (x: number) => string;
  e?: () => void;
}

type FooFnUnion = FunctionUnion<Foo>;
// (() => void) | ((x: number) => string) | ((() => void) | undefined)
```

### 表单类型工具

#### `CustomElement<T>`

表示具有常见输入属性的自定义表单元素。

```typescript
type CustomElement<T = any> = Partial<HTMLElement> & T & {
  checked?: boolean;
  disabled?: boolean;
  files?: FileList | null;
  focus?: Noop;
  options?: HTMLOptionsCollection;
  type?: string;
  value?: any;
};
```

#### `FieldElement<T>`

所有可能的字段元素的联合类型，包括 HTML 输入和自定义元素。

```typescript
type FieldElement<T = any> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<T>;

// 在表单处理器中使用
function handleFieldChange(field: FieldElement) {
  console.log(field.value);
}
```

### 路径类型工具

#### `LeafPaths<T>`

生成类型中所有叶子（非对象）值的可能路径的联合类型。

```typescript
type FormValues = {
  age: number;
  code: string;
  info: {
    age: number;
    city: string;
    name: string;
  };
  items: {
    id: number;
    label: string;
  }[];
};

type Paths = LeafPaths<FormValues>;
// "age"
// | "code"
// | "info.age"
// | "info.city"
// | "info.name"
// | `items.${number}.id`
// | `items.${number}.label`
```

#### `AllPaths<T>`

生成所有可能路径的联合类型，包括中间对象路径。

```typescript
type FormValues = {
  age: number;
  info: {
    city: string;
    address: {
      street: string;
    };
  };
};

type Paths = AllPaths<FormValues>;
// "age"
// | "info"
// | "info.city"
// | "info.address"
// | "info.address.street"
```

#### `PathToType<T, P>`

获取特定路径的类型，将对象属性设为可选。

```typescript
type FormValues = {
  age: number;
  info: {
    age: number;
    city: string;
    address: {
      street: string;
    };
  };
  items: {
    id: number;
    name: string;
  }[];
};

type AgeType = PathToType<FormValues, "age">; // number
type InfoType = PathToType<FormValues, "info">;
// { age?: number; city?: string; address?: { street: string } | undefined }
type ItemType = PathToType<FormValues, "items.0">;
// { id?: number; name?: string }
```

#### `PathToDeepType<T, P>`

获取特定路径的类型，将所有嵌套属性设为深度可选。

```typescript
type FormValues = {
  info: {
    age: number;
    address: {
      street: string;
      city: string;
    };
  };
};

type InfoType = PathToDeepType<FormValues, "info">;
// {
//   age?: number;
//   address?: {
//     street?: string;
//     city?: string;
//   } | undefined;
// }
```

#### `ShapeFromPaths<T, Ps>`

创建一个新类型，仅包含原始类型中指定的路径。

```typescript
type FormValues = {
  age: number;
  code: string;
  info: {
    age: number;
    city: string;
    name: string;
  };
  items: {
    id: number;
    label: string;
  }[];
};

type PartialShape = ShapeFromPaths<FormValues, ['age', 'info', 'items.2.label']>;
// {
//   age: number;
//   info: { age?: number; city?: string; name?: string };
//   items: { label?: string }[];
// }
```

#### `ArrayKeys<T>`

从对象中提取数组类型的键。

```typescript
type Inputs = {
  password: string;
  username: string;
  numbers: number[];
  users: {
    age: number;
    name: string;
  }[];
};

type Arrays = ArrayKeys<Inputs>; // "numbers" | "users"
```

#### `ArrayElementValue<T, K>`

获取数组属性的元素类型。

```typescript
type Inputs = {
  users: {
    age: number;
    name: string;
  }[];
};

type UserType = ArrayElementValue<Inputs, "users">;
// { age: number; name: string }
```

### 通用工具类型

#### `DeepPartial<T>`

递归地将类型的所有属性设为可选。

```typescript
type User = {
  name: string;
  age: number;
  address: {
    city: string;
    street: string;
    zipCode: number;
  };
};

type PartialUser = DeepPartial<User>;
// {
//   name?: string;
//   age?: number;
//   address?: {
//     city?: string;
//     street?: string;
//     zipCode?: number;
//   };
// }
```

#### `Prettify<T>`

展平交叉类型，使其在 IDE 工具提示中更易读。

```typescript
type A = { a: number };
type B = { b: string };
type C = { c: boolean };

type Raw = A & B & C;
// 悬停时显示: A & B & C (不易读)

type Pretty = Prettify<A & B & C>;
// 悬停时显示: { a: number; b: string; c: boolean } (易读！)
```

#### `Primitive`

所有原始类型的联合类型。

```typescript
type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Date
  | Function;
```

#### `Wrap<K, V>`

将值包装在具有特定键的对象中。

```typescript
type Wrapped = Wrap<"data", number>; // { data: number }
type User = Wrap<"user", { name: string; age: number }>;
// { user: { name: string; age: number } }
```

#### `MergeUnion<U>`

将对象类型的联合类型合并为单个交叉类型。

```typescript
type Union = { a: number } | { b: string } | { c: boolean };
type Merged = MergeUnion<Union>;
// { a: number; b: string; c: boolean }
```

#### `KeyToNestedObject<K, V>`

将点号表示的键转换为嵌套对象类型。

```typescript
type Nested = KeyToNestedObject<"a.b.c", number>;
// { a: { b: { c: number } } }

type UserPath = KeyToNestedObject<"user.profile.email", string>;
// { user: { profile: { email: string } } }
```

## 🎯 常见用例

### 类型安全的表单处理

```typescript
import type { LeafPaths, PathToType, FieldElement } from 'skyroc-type-utils';

type UserForm = {
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    age: number;
  };
  addresses: {
    street: string;
    city: string;
  }[];
};

// 类型安全的字段路径
type FieldPath = LeafPaths<UserForm>;
// "username" | "email" | "profile.firstName" | ...

// 从路径获取字段值类型
function getFieldValue<P extends FieldPath>(
  form: UserForm,
  path: P
): PathToType<UserForm, P> {
  // 实现...
}

// 使用时具有完整的类型安全
const age = getFieldValue(form, "profile.age"); // number
const city = getFieldValue(form, "addresses.0.city"); // string
```

### 提取 API 方法

```typescript
import type { OnlyFunctions, FunctionKeys } from 'skyroc-type-utils';

interface UserService {
  currentUser: User | null;
  isLoading: boolean;
  fetchUser(id: number): Promise<User>;
  updateUser(user: User): Promise<void>;
  deleteUser(id: number): Promise<void>;
  settings: {
    timeout: number;
  };
}

// 仅提取方法
type UserServiceMethods = OnlyFunctions<UserService>;
// {
//   fetchUser: (id: number) => Promise<User>;
//   updateUser: (user: User) => Promise<void>;
//   deleteUser: (id: number) => Promise<void>;
// }

// 获取方法名称
type MethodNames = FunctionKeys<UserService>;
// "fetchUser" | "updateUser" | "deleteUser"
```

### 部分表单更新

```typescript
import type { DeepPartial, ShapeFromPaths } from 'skyroc-type-utils';

type UserProfile = {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
  };
  settings: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
};

// 允许部分更新
function updateProfile(updates: DeepPartial<UserProfile>) {
  // 可以部分更新任何嵌套属性
}

updateProfile({
  personal: {
    firstName: "John" // 仅更新 firstName
  }
});

// 或选择特定字段
type ProfilePaths = ['personal.firstName', 'personal.email', 'settings.theme'];
type UpdateableFields = ShapeFromPaths<UserProfile, ProfilePaths>;

function updateSpecificFields(updates: UpdateableFields) {
  // 仅允许更新指定的路径
}
```

### 可读的类型别名

```typescript
import type { Prettify } from 'skyroc-type-utils';

// 不使用 Prettify - 难以阅读
type UserWithRole = User & { role: string } & { permissions: string[] };

// 使用 Prettify - 清晰易读
type CleanUserWithRole = Prettify<User & { role: string } & { permissions: string[] }>;
// 悬停显示: { id: number; name: string; role: string; permissions: string[] }
```

## 📖 TypeScript 支持

此包专为 TypeScript 设计，需要 TypeScript 4.7 或更高版本才能使用全部功能。所有类型都通过 JSDoc 注释完整记录，提供出色的 IDE 支持。

```typescript
// 出色的自动完成和类型提示
import type {
  LeafPaths,    // ← IDE 显示完整文档
  PathToType,   // ← 包含使用示例
  DeepPartial   // ← 和类型定义
} from 'skyroc-type-utils';
```

## 📄 许可证

MIT License

## 🔗 链接

- [GitHub 仓库](https://github.com/Ohh-889/skyroc-ui)
- [问题跟踪](https://github.com/Ohh-889/skyroc-ui/issues)

