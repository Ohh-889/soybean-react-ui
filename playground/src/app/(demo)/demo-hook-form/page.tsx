'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: number;
};

let count = 0;

export default function App() {
  const {
    formState: { errors, validatingFields },
    handleSubmit,
    register
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  count += 1;

  console.log('validatingFields', validatingFields, errors);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue="test"
        {...register('example')}
      />

      <div>count: {count}</div>

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register('exampleRequired', { min: 28, minLength: 2, required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
