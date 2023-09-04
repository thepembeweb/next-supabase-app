import { forwardRef } from 'react';
import classNames from 'clsx';

const InputFile = forwardRef<
  React.ElementRef<'input'>,
  React.InputHTMLAttributes<unknown>
>(function InputFileComponent({ className, ...props }, ref) {
  return (
    <input
      {...props}
      ref={ref}
      type={'file'}
      className={classNames(
        `flex h-10 w-full cursor-pointer items-center justify-center
                border-transparent bg-transparent
                py-2 text-sm shadow-none
                file:mr-4 file:cursor-pointer
                file:rounded-full file:border-0 file:bg-primary-500 file:py-2
                file:px-4 file:text-sm file:font-semibold
                file:text-white file:hover:bg-primary-600 file:active:bg-primary-700 dark:text-white`,
        className
      )}
    />
  );
});

export default InputFile;
