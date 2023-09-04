'use client';

import React, { forwardRef } from 'react';
import classNames from 'clsx';

import Label from './Label';
import If from '~/core/ui/If';

type Props = React.InputHTMLAttributes<unknown>;

const Hint: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span
      className={`block pl-1 text-xs
        font-normal leading-tight text-gray-500 dark:text-gray-400`}
    >
      {children}
    </span>
  );
};

const Input = forwardRef<React.ElementRef<'input'>, Props>(
  function TextFieldInputComponent({ className, children, ...props }, ref) {
    return (
      <div
        className={classNames(
          `active-within:ring-2 relative flex h-10 w-full items-center
        rounded-md border border-gray-200 bg-white font-medium text-gray-800
        shadow-sm ring-primary-200 ring-offset-1 transition-colors focus-within:ring-2
        hover:border-gray-300 hover:bg-gray-50 
        dark:border-dark-600 dark:bg-dark-800
        dark:text-gray-200 dark:focus-within:ring-primary-500/70 dark:focus-within:ring-offset-dark-900
        dark:hover:border-dark-500 dark:focus:bg-dark-800 lg:text-sm`,
          className,
          {
            [`cursor-not-allowed bg-gray-100 hover:bg-gray-100 dark:bg-dark-800`]:
              props.disabled,
          },
        )}
      >
        <If condition={children}>
          <span className={'flex pl-2.5'}>{children}</span>
        </If>

        <input
          {...props}
          className={classNames(
            `h-10 flex-1 rounded-md bg-transparent px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-30`,
            className,
          )}
          ref={ref}
        />
      </div>
    );
  },
);

type TextFieldComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> & {
  Label: typeof Label;
  Hint: typeof Hint;
  Input: typeof Input;
  Error: typeof ErrorMessage;
};

const TextField: TextFieldComponent = ({ children, className }) => {
  return (
    <div className={classNames(`flex flex-col space-y-1`, className)}>
      {children}
    </div>
  );
};

const ErrorMessage: React.FC<
  { error: Maybe<string> } & React.HTMLAttributes<unknown>
> = ({ error, ...props }) => {
  const shouldDisplay = !!error;

  if (!shouldDisplay) {
    return null;
  }

  return (
    <Hint>
      <span {...props} className={'py-0.5 text-red-700 dark:text-red-500'}>
        {error}
      </span>
    </Hint>
  );
};

TextField.Hint = Hint;
TextField.Label = Label;
TextField.Input = Input;
TextField.Error = ErrorMessage;

export default TextField;

export {
  TextField,
  Hint as TextFieldHint,
  Label as TextFieldLabel,
  Input as TextFieldInput,
  ErrorMessage as TextFieldError,
};
