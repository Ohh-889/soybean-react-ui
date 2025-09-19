'use client';

import { Button, Card, Form, FormComputedField, FormField, Input, useForm } from 'soybean-react-ui';

type FormValues = {
  price: number;
  quantity: number;
  total: number;
};

const ComputedDemo = () => {
  const [form] = useForm<FormValues>();

  function getValue() {
    const value = form.getFieldValue('total');

    console.log('value', value);
  }

  return (
    <Card
      split
      title="Computed"
    >
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
      >
        <FormField
          label="Price"
          name="price"
        >
          <Input />
        </FormField>

        <FormField
          label="Quantity"
          name="quantity"
        >
          <Input />
        </FormField>

        <FormComputedField
          deps={['price', 'quantity']}
          name="total"
          compute={get => {
            return Number(get('price')) * Number(get('quantity')) || 0;
          }}
        >
          <Input />
        </FormComputedField>

        <Button
          type="button"
          onClick={getValue}
        >
          Get Value
        </Button>
      </Form>
    </Card>
  );
};

export default ComputedDemo;
