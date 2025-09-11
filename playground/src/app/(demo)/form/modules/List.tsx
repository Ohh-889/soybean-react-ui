'use client';

import { ButtonIcon, Card, Form, FormField, FormList, Input, useForm } from 'soybean-react-ui';

type FormValues = {
  users: {
    age: number;
    name: string;
  }[];
};

const List = () => {
  const [form] = useForm<FormValues>();

  return (
    <Card
      split
      title="List"
    >
      <Form
        className="w-[480px] max-sm:w-full space-y-4"
        form={form}
      >
        <FormList
          name="users"
          initialValue={[
            { age: 20, name: 'John' },
            { age: 21, name: 'Jane' }
          ]}
        >
          {(fields, ops) => (
            <div>
              {fields.map(({ key, name }, index) => (
                <div
                  className="flex gap-x-2 items-center"
                  key={key}
                >
                  <FormField
                    className="flex-1"
                    label={`Name ${key}`}
                    name={`${name}.name`}
                  >
                    <Input placeholder={`Enter ${name}.name`} />
                  </FormField>

                  <FormField
                    className="flex-1"
                    label={`Age ${key}`}
                    name={`${name}.age`}
                  >
                    <Input placeholder={`Enter ${name}.age`} />
                  </FormField>

                  <div className="flex gap-x-2 mt-6">
                    <ButtonIcon
                      icon="ant-design:plus-outlined"
                      variant="ghost"
                      onClick={() => ops.insert(index + 1, { age: 11, name: '' })}
                    />

                    <ButtonIcon icon="ant-design:minus-outlined" />
                  </div>
                </div>
              ))}

              <div className="flex gap-x-2 mt-4 items-center">
                <div className="flex gap-x-2px items-center">
                  <div className="text-sm text-gray-500">replace 0:</div>
                  <ButtonIcon
                    icon="ant-design:swap-outlined"
                    variant="ghost"
                    onClick={() => ops.replace(0, { age: 99, name: 'Replaced' })}
                  />
                </div>

                <div className="flex gap-x-2px items-center">
                  <div className="text-sm text-gray-500">move 0 to 1: </div>
                  <ButtonIcon
                    icon="ant-design:arrow-up-outlined"
                    variant="ghost"
                    onClick={() => ops.move(0, 1)}
                  />
                </div>

                <div className="flex gap-x-2px items-center">
                  <div className="text-sm text-gray-500">swap 0 and 1: </div>
                  <ButtonIcon
                    icon="ant-design:retweet-outlined"
                    variant="ghost"
                    onClick={() => ops.swap(0, 1)}
                  />
                </div>
              </div>
            </div>
          )}
        </FormList>

        <FormList
          initialValue={['company1', 'company2']}
          name="companies"
        >
          {(fields, ops) => (
            <div>
              {fields.map(({ key, name }, index) => (
                <div
                  className="flex gap-x-2 items-center"
                  key={key}
                >
                  <FormField
                    label={`Company ${key}`}
                    name={name}
                  >
                    <Input placeholder={`Enter ${name}`} />
                  </FormField>
                  <div className="flex gap-x-2 mt-6">
                    <ButtonIcon
                      icon="ant-design:plus-outlined"
                      variant="ghost"
                      onClick={() => ops.insert(index + 1, `company${index + 1}`)}
                    />

                    <ButtonIcon icon="ant-design:minus-outlined" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </FormList>
      </Form>
    </Card>
  );
};

export default List;
