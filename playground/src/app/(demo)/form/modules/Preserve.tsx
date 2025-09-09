'use client';

import { useState } from 'react';
import { Button, Card, Form, FormField, Input, useForm } from 'soybean-react-ui';

const Preserve = () => {
  const [form] = useForm();

  const [show, setShow] = useState(true);

  const [load, setLoad] = useState(true);

  function toggle() {
    setShow(!show);
  }

  function toggleLoad() {
    setLoad(!load);
  }

  return (
    <Card title="Preserve">
      {load && (
        <Form
          className="w-[480px] max-sm:w-full space-y-4"
          form={form}
        >
          {show && (
            <FormField
              label="Username"
              name="username"
            >
              <Input placeholder="Username" />
            </FormField>
          )}

          <FormField
            label="Password"
            name="password"
            preserve={false}
          >
            <Input placeholder="Password" />
          </FormField>

          <div className="flex gap-x-2">
            <Button onClick={toggle}>Toggle</Button>
            <Button type="submit">Reset</Button>
          </div>
        </Form>
      )}
      <Button
        className="mt-4"
        onClick={toggleLoad}
      >
        Toggle Load
      </Button>
    </Card>
  );
};

export default Preserve;
