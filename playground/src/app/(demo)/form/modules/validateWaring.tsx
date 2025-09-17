'use client';

import { useEffect } from 'react';
import { Button, Card, Form, FormField, useFieldsState, useForm } from 'soybean-react-ui';

import { DemoInput } from './DemoComponents';
import { showToastCode } from './toast';

type Inputs = {
  email: string;
  username: string;
};

const ValidateOnlyDemo = () => {
  const [form] = useForm<Inputs>();

  const fieldsState = useFieldsState(form, ['email', 'username'], { mask: { warnings: true } });

  async function validateOnly() {
    await form.validateFields();
    const result = form.getFieldsWarning();

    showToastCode('warning result', result);
  }

  useEffect(() => {
    const warnings = fieldsState
      .filter(field => field.warnings.length > 0)
      .reduce(
        (acc, field) => {
          acc[field.name] = field.warnings;
          return acc;
        },
        {} as Record<string, string[]>
      );

    showToastCode('warnings', warnings);
  }, [fieldsState]);

  return (
    <Card title="Validate Only Demo">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
      >
        <FormField
          label="Username"
          name="username"
          rules={[
            { message: 'Username is required', required: true, warningOnly: true },
            { message: 'Username must be at least 4 characters', minLength: 4, warningOnly: true }
          ]}
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
            { message: 'Age must be at least 18', min: 18, type: 'number', warningOnly: true },
            { max: 35, message: 'Age must be less than 35', type: 'number', warningOnly: true }
          ]}
        >
          <DemoInput
            name="age"
            placeholder="Age"
          />
        </FormField>

        <FormField
          label="Email"
          name="email"
          rules={[
            { message: 'Please enter a valid email', type: 'email', warningOnly: true },
            { message: 'Email is required', required: true }
          ]}
        >
          <DemoInput
            name="email"
            placeholder="Email"
          />
        </FormField>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={validateOnly}
          >
            Validate Only
          </Button>

          <Button type="submit">Submit (Normal)</Button>
        </div>
      </Form>
    </Card>
  );
};

export default ValidateOnlyDemo;
