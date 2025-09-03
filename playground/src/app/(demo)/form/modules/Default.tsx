'use client';

import { Button, Checkbox, Form, FormField, Input, RadioGroup, Select, Switch, useForm } from 'soybean-react-ui';

const genderItems = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
];

const cities = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' }
];

type FormValues = {
  city: string;
  gender: 'female' | 'male';
  hobbies: string[];
  remember: boolean;
  username: string;
};

const Default = () => {
  const [form] = useForm<FormValues>();

  return (
    <Form
      className="w-[480px] max-sm:w-full space-y-4"
      form={form}
      onFinish={values => {
        console.log(values);
      }}
      onFinishFailed={errors => {
        console.log(errors);
      }}
    >
      <FormField<FormValues>
        label="Username"
        name="username"
        normalize={value => value.trim()}
        rules={[{ message: 'Username must be at least 3 characters', minLength: 3 }]}
      >
        <Input placeholder="Please input username" />
      </FormField>

      <FormField
        label="Gender"
        name="gender"
        trigger="onValueChange"
      >
        <RadioGroup items={genderItems} />
      </FormField>

      <FormField
        label="Remember"
        name="remember"
        trigger="onCheckedChange"
        valuePropName="checked"
      >
        <Switch className="block" />
      </FormField>

      <FormField
        label="Hobbies"
        name="hobbies"
        trigger="onCheckedChange"
        valuePropName="checked"
      >
        <Checkbox value="reading">Reading</Checkbox>
      </FormField>

      <FormField
        label="City"
        name="city"
        trigger="onValueChange"
      >
        <Select items={cities} />
      </FormField>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Default;
