'use client';

import React, { useEffect } from 'react';
import { Card, Form, FormField, Input, useForm, useWatch } from 'soybean-react-ui';

import { showToastCode } from './toast';

type Inputs = {
  age: number;
  info: { city: string; company: string };
  password: string;
  username: string;
};

export default function WatchDemo() {
  const [form] = useForm<Inputs>();

  // 1) Watch single field
  const username = useWatch(form, 'username');

  // 2) Watch multiple fields
  const { age, password } = useWatch(form, ['age', 'password']);

  // 3) Watch nested fields
  const info = useWatch(form, 'info', true);

  console.log('info', info);

  const { age: NewAge, password: NewPassword, username: NewUsername } = useWatch(form);

  useEffect(() => {
    showToastCode('NewValues', { NewAge, NewPassword, NewUsername });
  }, [NewAge, NewPassword, NewUsername]);

  return (
    <Card title="Use Watch">
      <div className="space-y-4 w-[480px] max-sm:w-full">
        <Form form={form}>
          <FormField
            label="Username"
            name="username"
          >
            <Input placeholder="Enter username" />
          </FormField>

          <FormField
            label="Age"
            name="age"
            rules={[{ message: 'Must be 18 or older', min: 18, type: 'number' }]}
          >
            <Input placeholder="Enter age" />
          </FormField>

          <FormField
            label="Password"
            name="password"
            rules={[{ message: 'Password must be at least 6 characters', minLength: 6 }]}
          >
            <Input placeholder="Enter password" />
          </FormField>

          <FormField
            label="Info&City"
            name="info.city"
            rules={[{ message: 'Password must be at least 6 characters', minLength: 6 }]}
          >
            <Input placeholder="Enter info.city" />
          </FormField>

          <FormField
            label="Info&company"
            name="info.company"
            rules={[{ message: 'Password must be at least 6 characters', minLength: 6 }]}
          >
            <Input placeholder="Enter info.company" />
          </FormField>
        </Form>

        {/* 4) Dynamic rendering */}
        <div className="mt-4 p-2 border rounded">
          <h3 className="font-bold">Real-time Watch Results:</h3>
          <p>Username: {username}</p>
          <p>Age: {age}</p>
          <p>Password: {password}</p>
        </div>
      </div>
    </Card>
  );
}
