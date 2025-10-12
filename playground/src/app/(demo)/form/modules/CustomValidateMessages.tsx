/* eslint-disable no-template-curly-in-string */
'use client';

import { Button, Card, Form, FormField, Input, useForm } from 'skyroc-ui';

// Form field types
type Inputs = {
  age: number;
  email: string;
  username: string;
};

const initialValues: Inputs = {
  age: 0,
  email: '',
  username: ''
};

const ValidateMessagesDemo = () => {
  const [form] = useForm<Inputs>();

  return (
    <Card title="Form with custom validateMessages">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
        initialValues={initialValues}
        validateMessages={{
          number: {
            min: 'This field must be greater than ${min}'
          },
          required: 'This field must be required'
        }}
      >
        <FormField
          label="Username"
          name="username"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter username" />
        </FormField>

        <FormField
          label="Age"
          name="age"
          rules={[{ min: 18, required: true, type: 'number' }]}
        >
          <Input
            placeholder="Enter age"
            type="number"
          />
        </FormField>

        <FormField
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="Enter email" />
        </FormField>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Card>
  );
};

export default ValidateMessagesDemo;
