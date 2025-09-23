'use client';

import { useEffect } from 'react';
import type { FormAction } from 'soybean-react-ui';
import { Button, Card, Form, FormField, Input, useForm } from 'soybean-react-ui';

// ============ Analytics Middleware (logging/tracking) ============
function analyticsMiddleware({ getState }: { dispatch: (a: FormAction) => void; getState: () => any }) {
  return (next: (a: FormAction) => void) => (action: FormAction) => {
    // the action before the middleware
    console.log('[middleware] before', action, 'state:', getState());

    next(action); // run default logic first

    // the action after the middleware
    console.log('[middleware] after', action, 'state:', getState());

    if (action.type === 'setFieldValue') {
      console.log(`[Analytics] User modified field: ${action.name}`, action.value);
      // Report tracking event
      // report({ field: action.name, value: action.value });
    }
  };
}

// ============ Form field types ============
type Inputs = {
  confirmPassword: string;
  password: string;
  username: string;
};

const initialValues: Inputs = {
  confirmPassword: '123456',
  password: '123456',
  username: 'ohh'
};

const UseFormWithMiddleware = () => {
  const [form] = useForm<Inputs>();

  useEffect(() => {
    // Register middleware: add analytics/tracing for form actions
    form.use(analyticsMiddleware);
  }, []);

  return (
    <Card title="UseForm with Middleware (Sync Password)">
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
        initialValues={initialValues}
      >
        <FormField
          label="Username"
          name="username"
        >
          <Input />
        </FormField>

        <FormField
          label="Password"
          name="password"
        >
          <Input />
        </FormField>

        <FormField
          label="Confirm Password"
          name="confirmPassword"
        >
          <Input />
        </FormField>

        <div className="flex gap-2 flex-wrap">
          <Button type="submit">Submit</Button>
          <Button onClick={() => form.setFieldValue('username', 'ohh-889')}>Set Username</Button>
        </div>
      </Form>
    </Card>
  );
};

export default UseFormWithMiddleware;
