'use client';

import type { FormInstance } from 'soybean-react-ui';
import { Button, Card, Form, FormField, Input, useFieldsState, useForm } from 'soybean-react-ui';

import { showToastCode } from './toast';

type Inputs = {
  confirmPassword: string;
  info: {
    age: number;
    familyInfo: {
      phone: string;
    };
    gender: string;
    hobbies: string;
  };
  password: string;
  username: string;
};

interface StateEffectProps {
  form: FormInstance<Inputs>;
}

const StateEffect = (props: StateEffectProps) => {
  const { form } = props;

  const states = useFieldsState(form, [], { includeChildren: true });

  console.log('states', states);

  return null;
};

const initialValues = {
  confirmPassword: '12345678',
  info: { age: 24, gender: 'male', hobbies: 'play lol' },
  password: '12345678',
  username: 'ohh'
};

const UseForm = () => {
  const [form] = useForm<Inputs>();

  function reset() {
    form.resetFields();
  }

  function resetInfo() {
    form.resetFields(['info']);
  }

  function getValues() {
    const values = form.getFieldsValue();

    const state = form.getFields();

    console.log('state', state);

    showToastCode('getAllValues', values);
  }

  function getInfoValues() {
    const values = form.getFieldValue('info');

    const infoValues = form.getFieldsValue(['info']);

    console.log('values', infoValues);

    showToastCode('getInfoValues', values);
  }

  function getInfoAge() {
    const value = form.getFieldValue('info.age');

    const infoAgeValues = form.getFieldsValue(['info.age']);

    console.log('infoAgeValues', infoAgeValues);

    showToastCode('getInfoAge', value);
  }

  function setInfoAge() {
    form.setFieldValue('info.age', 20);
  }

  function getInfoFamilyInfo() {
    const value = form.getFieldValue('info.familyInfo.phone');

    const infoFamilyInfoValues = form.getFieldsValue(['info.familyInfo.phone']);

    console.log('infoFamilyInfoValues', infoFamilyInfoValues);

    showToastCode('getInfoFamilyInfo', value);
  }

  function setInfoFamilyInfo() {
    form.setFieldValue('info.familyInfo.phone', '1234567890');
  }

  function setInfo() {
    form.setFieldsValue({ info: { gender: 'male', hobbies: 'reading' } });
  }

  function setValues() {
    form.setFieldsValue({
      confirmPassword: '123456',
      info: { age: 19, gender: 'female', hobbies: 'play game' },
      password: '123456',
      username: 'test'
    });
  }

  return (
    <Card title="UseForm">
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

        <FormField
          label="Info Age"
          name="info.age"
        >
          <Input />
        </FormField>

        <FormField
          label="Info Family Info"
          name="info.familyInfo.phone"
        >
          <Input />
        </FormField>

        <FormField
          label="Info Gender"
          name="info.gender"
        >
          <Input />
        </FormField>

        <FormField
          label="Info Hobbies"
          name="info.hobbies"
        >
          <Input />
        </FormField>

        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            onClick={getValues}
          >
            Get Values
          </Button>
          <Button
            type="button"
            onClick={getInfoValues}
          >
            Get Info Values
          </Button>
          <Button
            type="button"
            onClick={getInfoAge}
          >
            Get Info Age
          </Button>
          <Button
            type="button"
            onClick={getInfoFamilyInfo}
          >
            Get Info Family Info
          </Button>
          <Button
            type="button"
            onClick={setInfoAge}
          >
            Set Info Age
          </Button>
          <Button
            type="button"
            onClick={setInfoFamilyInfo}
          >
            Set Info Family Info
          </Button>
          <Button
            type="button"
            onClick={setInfo}
          >
            Set Info
          </Button>
          <Button
            type="button"
            onClick={setValues}
          >
            Set Values
          </Button>
          <Button
            type="button"
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={resetInfo}
          >
            Reset Info
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </Form>

      <StateEffect form={form} />
    </Card>
  );
};

export default UseForm;
