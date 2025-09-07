'use client';

import { useEffect } from 'react';
import { Button, Card, Form, FormField, useFieldErrors, useForm } from 'soybean-react-ui';

import { DemoInput } from './DemoComponents';
import { showToastCode } from './toast';

type Inputs = {
  age: number;
  username: string;
};

const Validate = () => {
  const [form] = useForm<Inputs>();

  // const errors = useFieldErrors(form);

  // useEffect(() => {
  //   // showToastCode('all Errors', errors);
  // }, [errors]);

  return (
    <Card title="Validate Fields">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
        onFinish={values => {
          showToastCode('You submitted the following values success Validate', values);
        }}
        onFinishFailed={errors => {
          showToastCode('You failed to submit the form failed Validate', errors);
        }}
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
            { message: 'Age must be at least 18', min: 18, type: 'number' },
            { max: 35, message: 'Age must be less than 35', type: 'number' }
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
            {
              message: 'Password must be at least 8 characters and contain at least one letter and one number',
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            }
          ]}
        >
          <DemoInput
            name="password"
            placeholder="Password"
          />
        </FormField>

        <FormField
          label="Password2"
          name="password2"
          rules={[
            {
              validator: (_, value, values) => {
                console.log('value', value);
                if (value !== values.password) {
                  return 'Password must be the same';
                }

                return null;
              }
            }
          ]}
        >
          <DemoInput
            name="password2"
            placeholder="Password2"
          />
        </FormField>

        <FormField
          label="Username2"
          name="username2"
          rules={[
            {
              // 异步校验，延迟 1000ms
              validator: async (_, value) => {
                console.log('start validate username:', value);

                await new Promise(r => setTimeout(r, 1000));

                if (!value) {
                  return 'Username2 is required';
                }

                if (value.toLowerCase() === 'admin') {
                  return 'This username2 is not allowed';
                }

                return null; // 校验通过
              }
            }
          ]}
        >
          <DemoInput
            name="username2"
            placeholder="Username2"
          />
        </FormField>

        <FormField
          label="Email"
          name="email"
          validateTrigger={['onChange', 'onBlur']}
          rules={[
            {
              message: 'Please enter a valid email',
              type: 'email',
              validateTrigger: 'onBlur' // 单个
            },
            {
              message: 'At least 6 characters',
              minLength: 6,
              validateTrigger: ['onChange', 'onBlur'] // 多个
            }
          ]}
        >
          <DemoInput
            name="email"
            placeholder="Email"
          />
        </FormField>

        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
};

export default Validate;
