'use client';

import React, { useState } from 'react';
import { Button, Card, Form, FormField, Input, useForm } from 'soybean-react-ui';

type FormValues = {
  password: string;
  username: string;
};

const ClearDestroy = () => {
  const [form] = useForm<FormValues>();

  const [show, setShow] = useState(true);

  function toggle() {
    setShow(!show);
  }

  return (
    <Card title="Clear Destroy">
      {show && (
        <Form
          clearOnDestroy
          className="w-[480px] max-sm:w-full space-y-4"
          form={form}
          initialValues={{ password: '123456' }}
        >
          <FormField
            label="Username"
            name="username"
          >
            <Input placeholder="Username" />
          </FormField>

          <FormField
            label="Password"
            name="password"
          >
            <Input placeholder="Password" />
          </FormField>
        </Form>
      )}

      <Button
        className="mt-2"
        onClick={toggle}
      >
        Toggle
      </Button>
    </Card>
  );
};

export default ClearDestroy;
