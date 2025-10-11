# Skyroc Type Utils

English | [简体中文](./README.zh.md)

Advanced TypeScript utility types for form handling, path manipulation, and type transformations. Provides a comprehensive collection of type utilities to enhance TypeScript's type system with powerful type-level programming capabilities.

## ✨ Features

- 🎯 **Advanced Type Utilities** - Rich collection of utility types for complex type transformations
- 📝 **Form Type Support** - Specialized types for form elements and custom components
- 🛤️ **Path Manipulation** - Type-safe path types for nested object access
- 🔧 **Function Type Helpers** - Extract and manipulate function types from objects
- 💪 **Deep Type Operations** - Deep partial, deep optional, and nested type utilities
- 🎨 **Type Prettification** - Make complex intersection types readable in IDE
- ⚡ **Zero Runtime** - All utilities are type-level only, zero runtime overhead

## 📦 Installation

```bash
npm install @skyroc/type-utils
# or
pnpm add @skyroc/type-utils
# or
yarn add @skyroc/type-utils
```

## 🚀 Quick Start

```typescript
import type {
  DeepPartial,
  LeafPaths,
  PathToType,
  OnlyFunctions,
  Prettify
} from '@skyroc/type-utils';

// Deep partial for nested objects
type User = {
  name: string;
  address: {
    city: string;
    street: string;
  };
};
type PartialUser = DeepPartial<User>;
// { name?: string; address?: { city?: string; street?: string } }

// Type-safe paths for nested properties
type UserPaths = LeafPaths<User>;
// "name" | "address.city" | "address.street"

// Get type from path
type CityType = PathToType<User, "address.city">; // string

// Extract only function properties
type API = {
  data: string;
  fetch(): Promise<void>;
  update(id: number): void;
};
type APIFunctions = OnlyFunctions<API>;
// { fetch: () => Promise<void>; update: (id: number) => void }
```

## 📚 API Reference

### Function Type Utilities

#### `Fn`

Generic function type.

```typescript
type Fn = (...args: any[]) => any;
```

#### `Noop`

No-operation function type.

```typescript
type Noop = () => void;
```

#### `OnlyFunctions<T>`

Extracts only function properties from an object type.

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

Extracts keys of function properties from an object type.

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

Creates a union of all function types in an object.

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

### Form Type Utilities

#### `CustomElement<T>`

Represents a custom form element with common input properties.

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

Union type for all possible field elements including HTML inputs and custom elements.

```typescript
type FieldElement<T = any> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<T>;

// Usage in form handlers
function handleFieldChange(field: FieldElement) {
  console.log(field.value);
}
```

### Path Type Utilities

#### `LeafPaths<T>`

Generates a union of all possible paths to leaf (non-object) values in a type.

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

Generates a union of all possible paths including intermediate object paths.

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

Gets the type at a specific path, making object properties optional.

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

Gets the type at a specific path, making all nested properties deeply optional.

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

Creates a new type containing only the specified paths from the original type.

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

Extracts keys that are array types from an object.

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

Gets the element type of an array property.

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

### General Utility Types

#### `DeepPartial<T>`

Makes all properties of a type optional recursively.

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

Flattens intersection types to make them more readable in IDE tooltips.

```typescript
type A = { a: number };
type B = { b: string };
type C = { c: boolean };

type Raw = A & B & C;
// When hovering: A & B & C (not readable)

type Pretty = Prettify<A & B & C>;
// When hovering: { a: number; b: string; c: boolean } (readable!)
```

#### `Primitive`

Union of all primitive types.

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

Wraps a value in an object with a specific key.

```typescript
type Wrapped = Wrap<"data", number>; // { data: number }
type User = Wrap<"user", { name: string; age: number }>;
// { user: { name: string; age: number } }
```

#### `MergeUnion<U>`

Merges a union of object types into a single intersection type.

```typescript
type Union = { a: number } | { b: string } | { c: boolean };
type Merged = MergeUnion<Union>;
// { a: number; b: string; c: boolean }
```

#### `KeyToNestedObject<K, V>`

Converts a dot-notation key into a nested object type.

```typescript
type Nested = KeyToNestedObject<"a.b.c", number>;
// { a: { b: { c: number } } }

type UserPath = KeyToNestedObject<"user.profile.email", string>;
// { user: { profile: { email: string } } }
```

## 🎯 Common Use Cases

### Type-Safe Form Handling

```typescript
import type { LeafPaths, PathToType, FieldElement } from '@skyroc/type-utils';

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

// Type-safe field paths
type FieldPath = LeafPaths<UserForm>;
// "username" | "email" | "profile.firstName" | ...

// Get field value type from path
function getFieldValue<P extends FieldPath>(
  form: UserForm,
  path: P
): PathToType<UserForm, P> {
  // Implementation...
}

// Usage with full type safety
const age = getFieldValue(form, "profile.age"); // number
const city = getFieldValue(form, "addresses.0.city"); // string
```

### Extract API Methods

```typescript
import type { OnlyFunctions, FunctionKeys } from '@skyroc/type-utils';

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

// Extract only methods
type UserServiceMethods = OnlyFunctions<UserService>;
// {
//   fetchUser: (id: number) => Promise<User>;
//   updateUser: (user: User) => Promise<void>;
//   deleteUser: (id: number) => Promise<void>;
// }

// Get method names
type MethodNames = FunctionKeys<UserService>;
// "fetchUser" | "updateUser" | "deleteUser"
```

### Partial Form Updates

```typescript
import type { DeepPartial, ShapeFromPaths } from '@skyroc/type-utils';

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

// Allow partial updates
function updateProfile(updates: DeepPartial<UserProfile>) {
  // Can update any nested property partially
}

updateProfile({
  personal: {
    firstName: "John" // Only update firstName
  }
});

// Or select specific fields
type ProfilePaths = ['personal.firstName', 'personal.email', 'settings.theme'];
type UpdateableFields = ShapeFromPaths<UserProfile, ProfilePaths>;

function updateSpecificFields(updates: UpdateableFields) {
  // Only allows updating specified paths
}
```

### Readable Type Aliases

```typescript
import type { Prettify } from '@skyroc/type-utils';

// Without Prettify - hard to read
type UserWithRole = User & { role: string } & { permissions: string[] };

// With Prettify - clean and readable
type CleanUserWithRole = Prettify<User & { role: string } & { permissions: string[] }>;
// Hover shows: { id: number; name: string; role: string; permissions: string[] }
```

## 📖 TypeScript Support

This package is designed specifically for TypeScript and requires TypeScript 4.7 or higher for full functionality. All types are fully documented with JSDoc comments for excellent IDE support.

```typescript
// Excellent autocomplete and type hints
import type {
  LeafPaths,    // ← IDE shows full documentation
  PathToType,   // ← With usage examples
  DeepPartial   // ← And type definitions
} from '@skyroc/type-utils';
```

## 📄 License

MIT License

## 🔗 Links

- [GitHub Repository](https://github.com/Ohh-889/skyroc-ui)
- [Issue Tracker](https://github.com/Ohh-889/skyroc-ui/issues)
