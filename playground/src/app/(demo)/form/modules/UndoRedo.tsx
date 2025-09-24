'use client';

import { Button, Card, Form, FormField, FormList, Input, useForm, useUndoRedo } from 'soybean-react-ui';

type Inputs = {
  email: string;
  tags: string[];
  username: string;
};

const initialValues: Inputs = {
  email: 'test@example.com',
  tags: ['vue', 'react'],
  username: 'ohh'
};

const UseFormWithUndoRedo = () => {
  const [form] = useForm<Inputs>();

  const undoRedo = useUndoRedo(form);

  function setUsername() {
    form.setFieldValue('username', 'new_user');
  }

  function insertTag() {
    form.arrayOp('tags').insert(1, 'typescript');
  }

  function undo() {
    undoRedo?.undo();
  }

  function redo() {
    undoRedo?.redo();
  }

  return (
    <Card title="UseForm with Undo/Redo">
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
          label="Email"
          name="email"
        >
          <Input />
        </FormField>

        <FormList
          initialValue={['vue', 'react']}
          name="tags"
        >
          {fields => (
            <div>
              {fields.map(({ key, name }) => (
                <FormField
                  key={key}
                  label={`Tag ${key}`}
                  name={name}
                >
                  <Input />
                </FormField>
              ))}
            </div>
          )}
        </FormList>

        <div className="flex gap-2 flex-wrap">
          <Button
            type="button"
            onClick={setUsername}
          >
            Change Username
          </Button>

          <Button
            type="button"
            onClick={insertTag}
          >
            Insert Tag
          </Button>

          <Button
            disabled={!undoRedo?.canUndo}
            type="button"
            onClick={undo}
          >
            Undo
          </Button>

          <Button
            disabled={!undoRedo?.canRedo}
            type="button"
            onClick={redo}
          >
            Redo
          </Button>

          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Card>
  );
};

export default UseFormWithUndoRedo;
