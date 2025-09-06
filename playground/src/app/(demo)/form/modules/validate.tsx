'use client';

import { useEffect } from 'react';
import { Card, Form, FormField, useFieldErrors, useForm } from 'soybean-react-ui';

import { DemoInput } from './DemoComponents';
import { showToastCode } from './toast';

type Inputs = {
  age: number;
  username: string;
};

const Validate = () => {
  const [form] = useForm<Inputs>();

  const errors = useFieldErrors(form);

  useEffect(() => {
    // showToastCode('all Errors', errors);
  }, [errors]);

  return (
    <Card title="Validate Fields">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
      >
        <FormField
          label="Username"
          name="username"
          rules={[{ required: true }]}
          validateTrigger="onBlur"
        >
          <DemoInput
            name="username"
            placeholder="Username"
          />
        </FormField>

        <FormField
          label="Age"
          name="age"
          rules={[
            { message: 'Age is required', required: true },
            { message: 'Age must be at least 18', min: 18, type: 'number' }
          ]}
        >
          <DemoInput
            name="age"
            placeholder="Age"
          />
        </FormField>

        <FormField
          label="Password"
          name="password"
          rules={[
            { message: 'Password must be at least 8 characters', minLength: 8, type: 'string' },
            {
              validator: (_, value) => {
                if (value.includes('123')) {
                  return 'Password cannot contain 123';
                }

                return null;
              }
            }
          ]}
        >
          <DemoInput
            name="password"
            placeholder="Password"
          />
        </FormField>
      </Form>
    </Card>
  );
};

export default Validate;
