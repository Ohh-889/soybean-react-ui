'use client';

import React from 'react';
import { Button, Card, Form, FormField, Input, useForm } from 'soybean-react-ui';

type Inputs = {
  info: { city: string; company: string };
  password: string;
  username: string;
};

const initialValues = {
  info: {
    city: 'Beijing'
  },
  password: '22333'
};

const Reset = () => {
  const [form] = useForm<Inputs>();

  const handleReset = () => {
    form.resetFields();
  };

  const handleResetUsername = () => {
    form.resetFields('password');
  };

  return (
    <Card title="Reset">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
        initialValues={initialValues}
      >
        <FormField
          label="Username"
          name="username"
        >
          <Input placeholder="Enter username" />
        </FormField>

        <FormField
          label="Password"
          name="password"
        >
          <Input placeholder="Enter password" />
        </FormField>

        <FormField
          label="Info&City"
          name="info.city"
        >
          <Input placeholder="Enter info.city" />
        </FormField>

        <FormField
          label="Info&Company"
          name="info.company"
        >
          <Input placeholder="Enter info.company" />
        </FormField>

        <div className="flex gap-x-1">
          <Button onClick={handleReset}>Reset All</Button>
          <Button onClick={handleResetUsername}>Reset Username</Button>
        </div>
      </Form>
    </Card>
  );
};

export default Reset;
