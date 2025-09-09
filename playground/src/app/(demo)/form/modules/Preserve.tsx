'use client';

import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Button, Card, Form, FormField, Input, useForm } from 'soybean-react-ui';

const CustomInput = (props: ComponentProps<typeof Input>) => {
  console.log('props', props);
  return <Input {...props} />;
};

const Preserve = () => {
  const [form] = useForm();

  const [show, setShow] = useState(true);

  function toggle() {
    setShow(!show);
  }

  return (
    <Card title="Preserve">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
      >
        {show && (
          <FormField
            label="Username"
            name="username"
          >
            <CustomInput placeholder="Username" />
          </FormField>
        )}

        <div className="flex gap-x-2">
          <Button onClick={toggle}>Toggle</Button>
          <Button type="submit">Reset</Button>
        </div>
      </Form>
    </Card>
  );
};

export default Preserve;
