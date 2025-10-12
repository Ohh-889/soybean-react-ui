'use client';

import Schema from 'async-validator';
import type { RuleItem } from 'async-validator';
import { Button, Card, Form, FormField, Input, useForm } from 'skyroc-ui';

// 定义 async-validator 规则
const descriptor: Record<string, RuleItem | RuleItem[]> = {
  email: { message: 'Email is not valid', required: true, type: 'email' },

  username: { message: 'Username must be at least 3 characters', min: 3, required: true, type: 'string' }
};

const validator = new Schema(descriptor);

type Inputs = {
  email: string;

  username: string;
};

const initialValues: Inputs = {
  email: '',
  username: ''
};

function normalizeKeys(name?: string | string[]): string[] | undefined {
  if (!name) return undefined;
  if (typeof name === 'string') {
    return [name];
  }
  return name;
}
// 将 async-validator 封装成符合 GenericResolver 的函数
async function asyncValidatorResolver(state: Inputs, name: string | string[] | undefined) {
  try {
    await validator.validate(state, {
      keys: normalizeKeys(name)
    });
    return []; // ✅ 校验通过
  } catch (err: any) {
    // ❌ 校验失败
    return (
      err.errors?.map((e: any) => ({
        message: e.message,
        path: e.field ? [e.field] : []
      })) ?? []
    );
  }
}

const AsyncValidatorDemo = () => {
  const [form] = useForm<Inputs>();

  return (
    <Card title="Form with AsyncValidator (function resolver)">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
        initialValues={initialValues}
        schema={asyncValidatorResolver} // ✅ 非标准库 → 传函数
      >
        <FormField
          label="Username"
          name="username"
        >
          <Input />
        </FormField>

        <FormField
          label="Email"
          name="email"
        >
          <Input />
        </FormField>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Card>
  );
};

export default AsyncValidatorDemo;
