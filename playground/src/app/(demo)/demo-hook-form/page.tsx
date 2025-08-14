'use client';

import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function App() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it

  const demo = register('exampleRequired', { required: true });

  console.log('demo', demo);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        defaultValue="test"
        {...register('example')}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...demo} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <button
        className="mr-4"
        onClick={() => {
          setValue('exampleRequired', '123777');
        }}
      >
        demo
      </button>

      <input type="submit" />
    </form>
  );
}
