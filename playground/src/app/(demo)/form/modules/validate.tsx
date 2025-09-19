'use client';

/* eslint-disable no-promise-executor-return */

import { useEffect } from 'react';
import { Button, Card, Form, FormField, useFieldError, useForm } from 'soybean-react-ui';

import { DemoInput } from './DemoComponents';
import { showToastCode } from './toast';

type Inputs = {
  age: number;
  username: string;
};

const Validate = () => {
  const [form] = useForm<Inputs>();

  const errors = useFieldError(form);

  useEffect(() => {
    showToastCode('all Errors', errors);
  }, [errors]);

  return (
    <Card title="Validate Fields">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
        onFinish={values => {
          showToastCode('You submitted the following values success Validate', values);
        }}
        onFinishFailed={errInfo => {
          showToastCode('You failed to submit the form failed Validate', errInfo);
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
          label="Nickname"
          name="nickname"
          rules={[
            { message: 'Nickname must be at least 3 chars', minLength: 3 },
            { maxLength: 8, message: 'Nickname must be less than 8 chars' }
          ]}
        >
          <DemoInput
            name="nickname"
            placeholder="Nickname"
          />
        </FormField>

        <FormField
          label="Work Email"
          name="workEmail"
          rules={[{ message: 'Invalid email format', type: 'email' }]}
        >
          <DemoInput
            name="workEmail"
            placeholder="Work Email"
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

        <FormField
          label="Role"
          name="role"
          rules={[{ enum: ['admin', 'user', 'guest'], message: 'Role must be admin, user, or guest', type: 'enum' }]}
        >
          <DemoInput
            name="role"
            placeholder="Role"
          />
        </FormField>

        <FormField
          label="Birthday"
          name="birthday"
          rules={[
            { message: 'Date must be after 2000-01-01', min: '2000-01-01', type: 'date' },
            { max: new Date(), message: 'Date cannot be in the future', type: 'date' }
          ]}
        >
          <DemoInput
            name="birthday"
            placeholder="Birthday (YYYY-MM-DD)"
          />
        </FormField>

        <FormField
          label="Website"
          name="website"
          rules={[{ message: 'Please enter a valid URL', type: 'url' }]}
        >
          <DemoInput
            name="website"
            placeholder="https://example.com"
          />
        </FormField>

        <FormField
          label="Nickname2 (warningOnly)"
          name="nickname2"
          rules={[
            {
              message: 'Nickname2 is too short (but just a warning)',
              minLength: 4,
              warningOnly: true
            }
          ]}
        >
          <DemoInput
            name="nickname2"
            placeholder="Nickname2"
          />
        </FormField>

        <FormField
          label="Bio (whitespace)"
          name="bio"
          rules={[{ message: 'Bio cannot be empty or whitespace only', required: true, whitespace: true }]}
        >
          <DemoInput
            name="bio"
            placeholder="Bio"
          />
        </FormField>

        <FormField
          label="Pin Code (len)"
          name="pin"
          rules={[
            {
              len: 4,
              message: 'PIN code must be exactly 4 digits',
              type: 'number'
            }
          ]}
        >
          <DemoInput
            name="pin"
            placeholder="PIN Code"
          />
        </FormField>

        <FormField
          label="Favorite Color"
          name="favoriteColor"
          rules={[{ message: 'Please enter a valid hex color (e.g. #FF5733)', type: 'hex' }]}
        >
          <DemoInput
            name="favoriteColor"
            placeholder="#FF5733"
          />
        </FormField>

        <Button type="submit">Submit</Button>
      </Form>
    </Card>
  );
};

export default Validate;
